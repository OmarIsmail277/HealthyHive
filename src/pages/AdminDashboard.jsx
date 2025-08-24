// /src/pages/AdminDashboard.jsx
import React, { useState, useMemo } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSignOutAlt,
  FaImage,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useAllProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProducts";
import { useLogout } from "../hooks/useUser";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// CATEGORY DATA FROM NAVLINKS
const categories = [
  {
    label: "Food",
    value: "food",
    sub: [
      { label: "Dairy", value: "dairy" },
      { label: "Nuts Spread", value: "nuts spread" },
      { label: "Sauces", value: "sauces" },
      { label: "Snacks", value: "snacks" },
    ],
  },
  {
    label: "Drinks",
    value: "drinks",
    sub: [
      { label: "Soft Drinks", value: "softDrinks" },
      { label: "Herbs", value: "herbs" },
      { label: "Juices", value: "juice" },
    ],
  },
  {
    label: "Personal Care",
    value: "personal care",
    sub: [
      { label: "Shampoo", value: "shampoo" },
      { label: "Shower Gel", value: "shower gel" },
      { label: "Hand Gel", value: "hand gel" },
    ],
  },
  {
    label: "Bakery",
    value: "bakery",
    sub: [
      { label: "Bread", value: "bread" },
      { label: "Pastries", value: "pastries" },
      { label: "Croissants", value: "croissants" },
    ],
  },
  {
    label: "Order Meals",
    value: "meals",
    sub: [
      { label: "Frozen", value: "frozen" },
      { label: "Pre-Order", value: "preorder" },
    ],
  },
];

// Initial product state for adding new products
const initialNewProduct = {
  SKU: "",
  SKUs: [],
  mainCategory: "",
  subCategory: "",
  stockStatus: true,
  stockQuantity: 0,
  price: 0,
  discount: 0,
  Name: "",
  description: "",
  brand: "",
  imageURL: "",
  rating: 0,
  nutritionFacts: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  ingredients: "",
};

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#48DBFB'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);

  // --- PRODUCTS HOOKS ---
  const { data: products = [], isLoading: loadingProducts } = useAllProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [newProduct, setNewProduct] = useState(initialNewProduct);
  const [imagePreview, setImagePreview] = useState(null);
  const [productEdit, setProductEdit] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // --- USER HOOKS ---
  const { logout } = useLogout();

  // --- Handle image upload for new product ---
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setNewProduct((prev) => ({ ...prev, imageURL: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Filtered products by search
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [
        p?.Name,
        p?.brand,
        p?.description,
        p?.mainCategory,
        p?.subCategory,
        p?.SKU,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [products, searchTerm]);

  // Calculate dashboard stats
  const dashboardStats = useMemo(() => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter(
      (p) => p.stockQuantity <= lowStockThreshold
    ).length;
    const outOfStockProducts = products.filter((p) => !p.stockStatus).length;
    const inStockProducts = totalProducts - outOfStockProducts;

    return {
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      inStockProducts,
    };
  }, [products, lowStockThreshold]);

  // Calculate category distribution for pie chart
  const categoryDistribution = useMemo(() => {
    const categoryCount = {};
    
    products.forEach(product => {
      const category = product.mainCategory || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value
    }));
  }, [products]);

  // Calculate low stock distribution for pie chart
  const lowStockDistribution = useMemo(() => {
    const lowStockByCategory = {};
    
    products
      .filter(product => product.stockQuantity <= lowStockThreshold)
      .forEach(product => {
        const category = product.mainCategory || 'Uncategorized';
        lowStockByCategory[category] = (lowStockByCategory[category] || 0) + 1;
      });
    
    return Object.entries(lowStockByCategory).map(([name, value]) => ({
      name,
      value
    }));
  }, [products, lowStockThreshold]);

  // --- Create Product ---
  const handleAddProduct = () => {
    if (!newProduct.Name || !newProduct.price || !newProduct.mainCategory)
      return toast.error("Name, price, and main category are required");

    const parsedProduct = {
      ...newProduct,
      stockStatus: Boolean(newProduct.stockStatus),
      stockQuantity: Number(newProduct.stockQuantity) || 0,
      price: Number(newProduct.price) || 0,
      discount: Number(newProduct.discount) || 0,
      rating: Number(newProduct.rating) || 0,
      nutritionFacts:
        newProduct.nutritionFacts && typeof newProduct.nutritionFacts === "object"
          ? {
              calories: Number(newProduct.nutritionFacts.calories) || 0,
              protein: Number(newProduct.nutritionFacts.protein) || 0,
              carbs: Number(newProduct.nutritionFacts.carbs) || 0,
              fat: Number(newProduct.nutritionFacts.fat) || 0,
            }
          : null,
    };

    createProduct.mutate(parsedProduct, {
      onSuccess: () => {
        toast.success("Product added successfully!");
        setNewProduct(initialNewProduct);
        setImagePreview(null);
      },
      onError: (err) => toast.error(err.message || "Failed to add product"),
    });
  };

  // --- Update Product ---
  const handleSaveEdit = () => {
    if (!productEdit) return;

    const payload = {
      id: productEdit.id,
      SKU: productEdit.SKU,
      SKUs: productEdit.SKUs || [],
      mainCategory: productEdit.mainCategory,
      subCategory: productEdit.subCategory,
      stockStatus: Boolean(productEdit.stockStatus),
      stockQuantity: Number(productEdit.stockQuantity),
      price: Number(productEdit.price),
      discount: productEdit.discount ? Number(productEdit.discount) : 0,
      Name: productEdit.Name,
      description: productEdit.description,
      brand: productEdit.brand,
      imageURL: productEdit.imageURL,
      rating: productEdit.rating ? Number(productEdit.rating) : 0,
      ingredients: productEdit.ingredients || null,
      nutritionFacts:
        productEdit.nutritionFacts &&
        Object.keys(productEdit.nutritionFacts).length > 0
          ? {
              calories: Number(productEdit.nutritionFacts.calories) || 0,
              protein: Number(productEdit.nutritionFacts.protein) || 0,
              carbs: Number(productEdit.nutritionFacts.carbs) || 0,
              fat: Number(productEdit.nutritionFacts.fat) || 0,
            }
          : null,
    };

    updateProduct.mutate(
      { id: Number(payload.id), product: payload },
      {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          setProductEdit(null);
        },
        onError: (err) => toast.error(err.message || "Failed to update product"),
      }
    );
  };

  // --- Delete Product ---
  const handleDelete = (id) => {
    deleteProduct.mutate(id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: () => toast.error("Failed to delete product"),
    });
  };

  // --- Export to Excel ---
  const exportToExcel = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Name",
      "Description",
      "Brand",
      "Main Category",
      "Sub Category",
      "Price",
      "Stock Quantity",
      "Stock Status",
      "SKU",
    ];
    
    const csvContent = [
      headers.join(","),
      ...products.map(product => [
        product.id,
        `"${product.Name?.replace(/"/g, '""')}"`,
        `"${product.description?.replace(/"/g, '""')}"`,
        `"${product.brand?.replace(/"/g, '""')}"`,
        product.mainCategory,
        product.subCategory,
        product.price,
        product.stockQuantity,
        product.stockStatus ? "In Stock" : "Out of Stock",
        product.SKU
      ].join(","))
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "products_backup.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Data exported successfully!");
  };

  if (loadingProducts) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-md"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar - Fixed */}
      <aside className={`fixed inset-y-0 left-0 w-48 sm:w-56 lg:w-64 bg-white shadow-lg flex flex-col justify-between transform transition-transform lg:transform-none z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="min-h-0 flex-1 flex flex-col">
          <div className="p-5 border-b">
            <h2 className="text-lg font-bold text-gray-800">Admin Dashboard</h2>
          </div>
          <nav className="flex-1 overflow-y-auto flex flex-col p-4 gap-3">
            <button
              className={`text-left px-4 py-2 rounded-lg font-medium ${
                activeTab === "dashboard"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("dashboard");
                setSidebarOpen(false);
              }}
            >
              Dashboard
            </button>
            <button
              className={`text-left px-4 py-2 rounded-lg font-medium ${
                activeTab === "products"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("products");
                setSidebarOpen(false);
              }}
            >
              Products
            </button>
            <button
              className={`text-left px-4 py-2 rounded-lg font-medium ${
                activeTab === "settings"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("settings");
                setSidebarOpen(false);
              }}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content (scrolls independently) */}
      <main className="lg:ml-48 sm:lg:ml-56  lg:ml-64">
        <div className="max-w-7xl ml-6  p-4 md:p-6 overflow-x-hidden">
          {activeTab === "dashboard" && (
            <section>
              <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Total Products</h3>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalProducts}</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">In Stock</h3>
                  <p className="text-3xl font-bold text-green-600">{dashboardStats.inStockProducts}</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Out of Stock</h3>
                  <p className="text-3xl font-bold text-red-600">{dashboardStats.outOfStockProducts}</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Low Stock</h3>
                  <p className="text-3xl font-bold text-yellow-600">{dashboardStats.lowStockProducts}</p>
                </div>
              </div>
              
              {/* Pie Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Category Distribution Pie Chart */}
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Products by Category</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Low Stock Distribution Pie Chart */}
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Low Stock by Category</h3>
                  {lowStockDistribution.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={lowStockDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {lowStockDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      No low stock products
                    </div>
                  )}
                </div>
              </div>
              
              {/* Export Button */}
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Data Export</h3>
                <button
                  onClick={exportToExcel}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                >
                  Export to Excel (CSV)
                </button>
              </div>
              
              {/* Static Data */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="text-sm font-medium text-gray-700 mb-3">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600"><span className="font-medium">Platform:</span> Admin Dashboard v1.0</p>
                    <p className="text-gray-600"><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><span className="font-medium">Total Categories:</span> {categories.length}</p>
                    <p className="text-gray-600"><span className="font-medium">Low Stock Threshold:</span> {lowStockThreshold} units</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "products" && (
            <section>
              <h1 className="text-2xl font-semibold mb-6">Manage Products</h1>

              {/* Add New Product */}
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Add New Product
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      placeholder="Product Name"
                      value={newProduct.Name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, Name: e.target.value })
                      }
                    />
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm h-24"
                      placeholder="Description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      placeholder="Brand"
                      value={newProduct.brand}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, brand: e.target.value })
                      }
                    />

                    {/* MAIN CATEGORY SELECT */}
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      value={newProduct.mainCategory}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          mainCategory: e.target.value,
                          subCategory: "",
                        })
                      }
                    >
                      <option value="">Select Main Category</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>

                    {/* SUBCATEGORY SELECT */}
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      value={newProduct.subCategory}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          subCategory: e.target.value,
                        })
                      }
                      disabled={!newProduct.mainCategory}
                    >
                      <option value="">Select Subcategory</option>
                      {categories
                        .find((c) => c.value === newProduct.mainCategory)
                        ?.sub.map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label}
                          </option>
                        ))}
                    </select>

                    {/* INGREDIENTS */}
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm h-20"
                      placeholder="Ingredients (comma separated)"
                      value={newProduct.ingredients}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          ingredients: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        placeholder="Stock Quantity"
                        value={newProduct.stockQuantity}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stockQuantity: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      <NumInput
                        label="Calories"
                        value={newProduct.nutritionFacts?.calories ?? 0}
                        onChange={(v) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              calories: v,
                            },
                          }))
                        }
                      />
                      <NumInput
                        label="Protein (g)"
                        value={newProduct.nutritionFacts?.protein ?? 0}
                        onChange={(v) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              protein: v,
                            },
                          }))
                        }
                      />
                      <NumInput
                        label="Carbs (g)"
                        value={newProduct.nutritionFacts?.carbs ?? 0}
                        onChange={(v) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              carbs: v,
                            },
                          }))
                        }
                      />
                      <NumInput
                        label="Fat (g)"
                        value={newProduct.nutritionFacts?.fat ?? 0}
                        onChange={(v) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              fat: v,
                            },
                          }))
                        }
                      />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={newProduct.stockStatus}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stockStatus: e.target.checked,
                          })
                        }
                      />
                      In Stock
                    </label>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL or Upload
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                          placeholder="Image URL"
                          value={newProduct.imageURL}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              imageURL: e.target.value,
                            })
                          }
                        />
                        <label className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition text-sm cursor-pointer">
                          <span className="inline-flex items-center gap-2">
                            <FaImage /> Upload
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        {imagePreview && (
                          <div className="w-12 h-12 rounded border overflow-hidden">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleAddProduct}
                      className="w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                      <FaPlus size={14} /> Add Product
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Bar ABOVE Products List */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products by name, brand, category, SKU..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                />
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="min-w-full table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <Th>Product</Th>
                      <Th>Category</Th>
                      <Th>Price</Th>
                      <Th>Stock</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="align-top">
                        <Td>
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden shrink-0">
                              <img
                                src={product.imageURL}
                                alt={product.Name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="max-w-[300px]">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product.Name}
                              </p>
                              <p className="text-xs text-gray-500 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </Td>
                        <Td className="whitespace-normal">
                          <span className="text-sm">
                            {product.mainCategory}/{product.subCategory}
                          </span>
                        </Td>
                        <Td>LE{product.price}</Td>
                        <Td>{product.stockQuantity}</Td>
                        <Td>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.stockStatus
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stockStatus ? "In Stock" : "Out of Stock"}
                          </span>
                        </Td>
                        <Td>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setProductEdit(product)}
                              className="px-3 py-1 rounded-lg bg-white border hover:bg-gray-50 text-xs flex items-center gap-1"
                            >
                              <FaEdit size={12} /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 text-xs flex items-center gap-1"
                            >
                              <FaTrash size={12} /> Delete
                            </button>
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                  <div className="p-6 text-sm text-gray-500">
                    No products match your search.
                  </div>
                )}
              </div>

              {/* Edit Modal */}
              {productEdit && (
                <Modal
                  title="Edit Product"
                  onClose={() => setProductEdit(null)}
                >
                  <div className="space-y-3">
                    <input
                      className="w-full px-3 py-2 rounded-lg border border-gray-200"
                      value={productEdit.Name}
                      onChange={(e) =>
                        setProductEdit({ ...productEdit, Name: e.target.value })
                      }
                      placeholder="Name"
                    />
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 h-24"
                      value={productEdit.description}
                      onChange={(e) =>
                        setProductEdit({
                          ...productEdit,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                    />

                    {/* MAIN CATEGORY SELECT */}
                    <select
                      value={productEdit.mainCategory}
                      onChange={(e) =>
                        setProductEdit({
                          ...productEdit,
                          mainCategory: e.target.value,
                          subCategory: "",
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    >
                      <option value="">Select Main Category</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>

                    {/* SUBCATEGORY SELECT */}
                    <select
                      value={productEdit.subCategory}
                      onChange={(e) =>
                        setProductEdit({
                          ...productEdit,
                          subCategory: e.target.value,
                        })
                      }
                      disabled={!productEdit.mainCategory}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    >
                      <option value="">Select Subcategory</option>
                      {categories
                        .find((c) => c.value === productEdit.mainCategory)
                        ?.sub.map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label}
                          </option>
                        ))}
                    </select>

                    {/* Nutrition Facts (Edit) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <NumInput
                        label="Calories"
                        value={productEdit.nutritionFacts?.calories ?? 0}
                        onChange={(v) =>
                          setProductEdit((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              calories: v,
                            },
                          }))
                        }
                      />
                      <NumInput
                        label="Protein (g)"
                        value={productEdit.nutritionFacts?.protein ?? 0}
                        onChange={(v) =>
                          setProductEdit((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              protein: v,
                            },
                          }))
                        }
                      />
                      <NumInput
                        label="Carbs (g)"
                        value={productEdit.nutritionFacts?.carbs ?? 0}
                        onChange={(v) =>
                          setProductEdit((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              carbs: v,
                            },
                          }))
                        }
                      />
                      <NumInput
                        label="Fat (g)"
                        value={productEdit.nutritionFacts?.fat ?? 0}
                        onChange={(v) =>
                          setProductEdit((prev) => ({
                            ...prev,
                            nutritionFacts: {
                              ...(prev.nutritionFacts || {}),
                              fat: v,
                            },
                          }))
                        }
                      />
                    </div>

                    {/* Ingredients */}
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 h-20"
                      value={productEdit.ingredients || ""}
                      onChange={(e) =>
                        setProductEdit({
                          ...productEdit,
                          ingredients: e.target.value,
                        })
                      }
                      placeholder="Ingredients (comma separated)"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200"
                        value={productEdit.price}
                        onChange={(e) =>
                          setProductEdit({
                            ...productEdit,
                            price: e.target.value,
                          })
                        }
                        placeholder="Price"
                      />
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200"
                        value={productEdit.stockQuantity}
                        onChange={(e) =>
                          setProductEdit({
                            ...productEdit,
                            stockQuantity: e.target.value,
                          })
                        }
                        placeholder="Stock Quantity"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={productEdit.stockStatus}
                        onChange={(e) =>
                          setProductEdit({
                            ...productEdit,
                            stockStatus: e.target.checked,
                          })
                        }
                      />
                      In Stock
                    </label>
                    <button
                      onClick={handleSaveEdit}
                      className="w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </Modal>
              )}
            </section>
          )}

          {activeTab === "settings" && (
            <section>
              <h1 className="text-2xl font-semibold mb-6">Settings</h1>
              
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Low Stock Alert Threshold</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Set the minimum stock quantity at which products are considered "low stock"
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                    min="0"
                  />
                  <span className="text-sm text-gray-600">units</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="text-sm font-medium text-gray-700 mb-3">System Information</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium">Admin Dashboard Version:</span> 1.0.0</p>
                  <p><span className="font-medium">Total Products:</span> {products.length}</p>
                  <p><span className="font-medium">Categories:</span> {categories.length}</p>
                  <p><span className="font-medium">Last Export:</span> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper components for table
function Th({ children }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm ${className}`}>
      {children}
    </td>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function NumInput({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-600">{label}</label>
      <input
        type="number"
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}