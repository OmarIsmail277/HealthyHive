// AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaBoxes,
  FaMoneyBillWave,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSync,
  FaChartLine,
  FaCog,
  FaHome,
  FaShoppingBag,
  FaUserCog,
  FaSignOutAlt,
  FaImage,
  FaEdit,
  FaDownload,
  FaUpload,
  FaArrowUp,
  FaArrowDown,
  FaInfoCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";

/* =========================================================================
 * LocalStorage helpers
 * ========================================================================= */
const getLS = (k, fallback) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const setLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/* =========================================================================
 * Utils
 * ========================================================================= */
const uuid = () =>
  (typeof crypto !== "undefined" &&
    crypto &&
    typeof crypto.randomUUID === "function" &&
    crypto.randomUUID()) ||
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const safeDateMs = (d) => {
  if (!d) return 0;
  const t = Date.parse(d);
  return Number.isNaN(t) ? 0 : t;
};

const currency = (n) =>
  (typeof n === "number" ? n : parseFloat(n || 0)).toFixed(2);

/* =========================================================================
 * Toast Notification System
 * ========================================================================= */
const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = uuid();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === "error"
                ? "bg-red-100 text-red-800"
                : toast.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {toast.type === "error" ? (
              <FaTimesCircle className="text-red-500" />
            ) : toast.type === "success" ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaInfoCircle className="text-blue-500" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  return React.useContext(ToastContext);
}

/* =========================================================================
 * Error Boundary (prevents white blank pages)
 * ========================================================================= */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("AdminDashboard ErrorBoundary", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4">
            <div className="font-semibold mb-1">Something went wrong.</div>
            <div className="text-sm opacity-90">
              {this.state.error?.message || "Unknown error"}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminDashboard() {
  const { addToast } = useToast();

  // Navigation
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data states
const [users, setUsers] = useState(
  getLS("admin_users", [
    {
      id: "u1",
      name: "Alex Green",
      email: "alex@example.com",
      joinDate: "2023-05-15",
      lastActive: "2023-10-20"
    },
    {
      id: "u2",
      name: "Sam Wilson",
      email: "sam@example.com",
      joinDate: "2023-06-20",
      lastActive: "2023-09-15"
    },
    {
      id: "u3",
      name: "Taylor Swift",
      email: "taylor@example.com",
      joinDate: "2023-07-10",
      lastActive: "2023-10-01"
    },
    {
      id: "u4",
      name: "Jordan Smith",
      email: "jordan@example.com",
      joinDate: "2023-08-05",
      lastActive: "2023-10-15"
    },
    {
      id: "u5",
      name: "Casey Johnson",
      email: "casey@example.com",
      joinDate: "2023-08-12",
      lastActive: "2023-10-18"
    },
    {
      id: "u6",
      name: "Riley Williams",
      email: "riley@example.com",
      joinDate: "2023-09-01",
      lastActive: "2023-10-10"
    },
    {
      id: "u7",
      name: "Morgan Brown",
      email: "morgan@example.com",
      joinDate: "2023-09-15",
      lastActive: "2023-10-05"
    },
    {
      id: "u8",
      name: "Jamie Davis",
      email: "jamie@example.com",
      joinDate: "2023-09-20",
      lastActive: "2023-10-19"
    }
  ])
);

  const [products, setProducts] = useState(
    getLS("admin_products", [
      {
        id: "p1",
        name: "Protein Powder",
        description: "Premium whey isolate with 25g protein per serving.",
        price: 29.99,
        stock: 45,
        inStock: true,
        image: "https://via.placeholder.com/150",
        category: "supplements",
        createdAt: "2023-07-01"
      },
      {
        id: "p2",
        name: "Yoga Mat",
        description: "Eco-friendly non-slip yoga mat with carrying strap.",
        price: 24.99,
        stock: 0,
        inStock: false,
        image: "https://via.placeholder.com/150",
        category: "equipment",
        createdAt: "2023-07-02"
      },
      {
        id: "p3",
        name: "Dumbbell Set",
        description: "Adjustable dumbbells up to 20kg each, compact design.",
        price: 89.99,
        stock: 12,
        inStock: true,
        image: "https://via.placeholder.com/150",
        category: "equipment",
        createdAt: "2023-07-05"
      }
    ])
  );

  const [subscriptions, setSubscriptions] = useState(
    getLS("admin_subscriptions", [
      {
        id: "s1",
        userId: "u1",
        plan: "Premium",
        status: "active",
        expires: "2023-12-31",
        paymentMethod: "credit_card",
        monthlyPrice: 19.99
      },
      {
        id: "s2",
        userId: "u2",
        plan: "Basic",
        status: "expired",
        expires: "2023-09-30",
        paymentMethod: "paypal",
        monthlyPrice: 9.99
      },
      {
        id: "s3",
        userId: "u3",
        plan: "Premium",
        status: "active",
        expires: "2024-01-15",
        paymentMethod: "credit_card",
        monthlyPrice: 19.99
      }
    ])
  );

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "supplements",
    image: "",
    inStock: true
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [productEdit, setProductEdit] = useState(null);

  // Persist
  useEffect(() => setLS("admin_users", users), [users]);
  useEffect(() => setLS("admin_products", products), [products]);
  useEffect(() => setLS("admin_subscriptions", subscriptions), [subscriptions]);

  // Stats
  const stats = useMemo(() => {
    const totalProducts = products.length;
    // Only count products with stock > 0 and stock < 5 as low stock
    const low = products.filter(p => p.stock > 0 && p.stock < 5).length;
    const safePct =
      totalProducts === 0 ? 0 : Math.round((low / totalProducts) * 100);

    const monthlyRevenue = subscriptions
      .filter(s => s.status === "active")
      .reduce((sum, sub) => sum + Number(sub.monthlyPrice || 0), 0);

    return {
      totalUsers: users.length,
      activeUsers: users.filter(u =>
        subscriptions.some(s => s.userId === u.id && s.status === "active")
      ).length,
      totalProducts,
      inStockProducts: products.filter(p => p.inStock).length,
      activeSubscriptions: subscriptions.filter(s => s.status === "active").length,
      monthlyRevenue,
      lowStockProducts: low,
      lowPct: safePct
    };
  }, [users, products, subscriptions]);

  /* =======================================================================
   * Handlers
   * ======================================================================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setNewProduct(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addNewProduct = () => {
    if (!newProduct.name || newProduct.price === "") {
      addToast("Please fill in required fields", "error");
      return;
    }
    const stockNum = Math.max(0, parseInt(newProduct.stock, 10) || 0);
    const priceNum = parseFloat(newProduct.price) || 0;

    const product = {
      id: uuid(),
      name: String(newProduct.name).trim(),
      description: String(newProduct.description || "").trim(),
      price: priceNum,
      stock: stockNum,
      category: newProduct.category,
      image: newProduct.image || "https://via.placeholder.com/150",
      inStock: (newProduct.inStock && stockNum > 0) || stockNum > 0,
      createdAt: new Date().toISOString()
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "supplements",
      image: "",
      inStock: true
    });
    setImagePreview(null);
    addToast("Product added successfully", "success");
  };

  const deleteUser = (userId) => {
    const u = users.find(x => x.id === userId);
    if (!u) return;

    setUsers(prev => prev.filter(x => x.id !== userId));
    setSubscriptions(prev => prev.filter(s => s.userId !== userId));
    addToast(`User ${u.name} deleted`, "success");
  };

  const renewSubscription = (userId, months = 1) => {
    const now = new Date();
    const base = new Date(
      now.getFullYear(),
      now.getMonth() + months,
      now.getDate()
    );
    const newExpiryISO = base.toISOString().slice(0, 10);

    const existing = subscriptions.find(s => s.userId === userId);
    if (existing) {
      // Only renew if status is expired
      if (existing.status === "expired") {
        setSubscriptions(subscriptions.map(s =>
          s.userId === userId ? { ...s, status: "active", expires: newExpiryISO } : s
        ));
        addToast(`Subscription renewed for ${months} month(s)`, "success");
      }
    } else {
      setSubscriptions([
        ...subscriptions,
        {
          id: uuid(),
          userId,
          plan: "Basic",
          status: "active",
          expires: newExpiryISO,
          paymentMethod: "credit_card",
          monthlyPrice: 9.99
        }
      ]);
      addToast("New subscription created", "success");
    }
  };

  const upgradeSubscription = (userId) => {
    setSubscriptions(subscriptions.map(s =>
      s.userId === userId
        ? { ...s, plan: "Premium", monthlyPrice: 19.99 }
        : s
    ));
    addToast("Subscription upgraded to Premium", "success");
  };

  const endSubscription = (userId) => {
    setSubscriptions(subscriptions.map(s =>
      s.userId === userId
        ? { ...s, status: "expired", expires: new Date().toISOString().slice(0, 10) }
        : s
    ));
    addToast("Subscription ended", "success");
  };

  const updateProductStock = (id, value) => {
    const newStock = Math.max(0, parseInt(value, 10) || 0);
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, stock: newStock, inStock: newStock > 0 } : p
    ));
  };

  const toggleProductStock = (id) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, inStock: !p.inStock } : p
    ));
  };

  const openEditProduct = (p) => setProductEdit({ ...p });

  const saveEditProduct = () => {
    if (!productEdit) return;
    const { id } = productEdit;
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...productEdit } : p)));
    setProductEdit(null);
    addToast("Product updated successfully", "success");
  };

  const deleteProduct = (id) => {
    const pr = products.find(p => p.id === id);
    if (!pr) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast(`Product ${pr.name} deleted`, "success");
  };

  // Filtered views (search removed)
  const filteredUsers = users;
  const filteredProducts = products;
  const filteredSubscriptions = subscriptions;

  /* =======================================================================
   * UI helpers
   * ======================================================================= */
  const card = "bg-white rounded-xl shadow-sm p-5 overflow-hidden";
  const pill = "px-3 py-1 rounded-full text-xs font-medium";
  const input =
    "w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500";
  const btnPrimary =
    "px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2";
  const btnSecondary =
    "px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2";
  const btnDanger =
    "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2";

  // Column widths for tables
  const colWidths = {
    user: "w-[250px]",
    status: "w-[120px]",
    lastActive: "w-[120px]",
    subscription: "w-[180px]",
    actions: "w-[220px]",
    product: "w-[300px]",
    category: "w-[120px]",
    price: "w-[100px]",
    stock: "w-[120px]",
    plan: "w-[120px]",
    payment: "w-[120px]",
    expires: "w-[120px]"
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 z-30 w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              <NavItem
                icon={<FaHome />}
                label="Dashboard"
                active={activeTab === "dashboard"}
                onClick={() => setActiveTab("dashboard")}
              />
              <NavItem
                icon={<FaUsers />}
                label="Users"
                active={activeTab === "users"}
                onClick={() => setActiveTab("users")}
              />
              <NavItem
                icon={<FaShoppingBag />}
                label="Products"
                active={activeTab === "products"}
                onClick={() => setActiveTab("products")}
              />
              <NavItem
                icon={<FaMoneyBillWave />}
                label="Subscriptions"
                active={activeTab === "subscriptions"}
                onClick={() => setActiveTab("subscriptions")}
              />
              <NavItem
                icon={<FaCog />}
                label="Settings"
                active={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
              />
            </nav>

            <div className="p-4 border-t border-gray-200">
              <Link to="/login" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <FaSignOutAlt /> Logout
              </Link>
            </div>
          </div>
        </aside>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed bottom-4 left-4 z-40 md:hidden p-3 bg-white rounded-full shadow-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimesCircle /> : <FaUserCog />}
        </button>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "dashboard" && "Admin Dashboard"}
                {activeTab === "users" && "User Management"}
                {activeTab === "products" && "Product Management"}
                {activeTab === "subscriptions" && "Subscription Management"}
                {activeTab === "settings" && "Settings"}
              </h1>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  className={btnSecondary}
                  onClick={() => {
                    const blob = new Blob(
                      [
                        JSON.stringify(
                          { users, products, subscriptions, exportedAt: new Date().toISOString() },
                          null,
                          2
                        )
                      ],
                      { type: "application/json;charset=utf-8" }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `admin-backup-${new Date()
                      .toISOString()
                      .slice(0, 10)}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    addToast("Data exported successfully", "success");
                  }}
                >
                  <FaDownload /> Export
                </button>

                <label className={`${btnSecondary} cursor-pointer`}>
                  <FaUpload /> Import
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const text = await file.text();
                        const data = JSON.parse(text);
                        if (Array.isArray(data.users)) setUsers(data.users);
                        if (Array.isArray(data.products)) setProducts(data.products);
                        if (Array.isArray(data.subscriptions))
                          setSubscriptions(data.subscriptions);
                        addToast("Data imported successfully", "success");
                      } catch (err) {
                        addToast("Failed to import file", err);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <StatCard
                    icon={<FaUsers className="text-blue-500 text-3xl" />}
                    label="Total Users"
                    value={stats.totalUsers}
                    secondaryValue={`${stats.activeUsers} active`}
                  />
                  <StatCard
                    icon={<FaShoppingBag className="text-emerald-500 text-3xl" />}
                    label="Products"
                    value={stats.totalProducts}
                    secondaryValue={`${stats.inStockProducts} in stock`}
                  />
                  <StatCard
                    icon={<FaMoneyBillWave className="text-purple-500 text-3xl" />}
                    label="Subscriptions"
                    value={stats.activeSubscriptions}
                    secondaryValue={`LE${currency(stats.monthlyRevenue)}/mo`}
                  />
                  <StatCard
                    icon={<FaBoxes className="text-yellow-500 text-3xl" />}
                    label="Low Stock"
                    value={stats.lowStockProducts}
                    secondaryValue={`${stats.lowPct}% of products`}
                  />
                </div>

                {/* Recent Activity */}
                <section className={card}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaChartLine className="text-green-500" /> Recent Activity
                  </h2>
                  <div className="space-y-3">
                    {[
                      ...users.map(u => ({
                        type: "user",
                        id: u.id,
                        name: u.name,
                        date: u.joinDate
                      })),
                      ...products.map(p => ({
                        type: "product",
                        id: p.id,
                        name: p.name,
                        date: p.createdAt
                      }))
                    ]
                      .sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date))
                      .slice(0, 8)
                      .map(item => (
                        <div
                          key={`${item.type}-${item.id}`}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {item.type === "product" ? <FaShoppingBag /> : <FaUserCog />}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.type === "product"
                                  ? `New product: ${item.name}`
                                  : `New user: ${item.name}`}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.date ? new Date(item.date).toLocaleDateString() : "—"}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`${pill} ${
                              item.type === "product"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.type === "product" ? "Product" : "User"}
                          </span>
                        </div>
                      ))}
                  </div>
                </section>
              </div>
            )}

            {/* USERS */}
            {activeTab === "users" && (
              <section className={card}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaUsers className="text-blue-500" /> User Management
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <Th className={colWidths.user}>User</Th>
                        <Th className={colWidths.lastActive}>Joined</Th>
                        <Th className={colWidths.subscription}>Subscription</Th>
                        <Th className={colWidths.actions}>Actions</Th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map(user => {
                        const userSub = subscriptions.find(s => s.userId === user.id);
                        return (
                          <tr key={user.id}>
                            <Td className={colWidths.user}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                  <FaUserCog className="text-gray-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </Td>
                            <Td className={`${colWidths.lastActive} text-sm text-gray-500`}>
                              {user.joinDate || "—"}
                            </Td>
                            <Td className={colWidths.subscription}>
                              {userSub ? (
                                <span
                                  className={`${pill} ${
                                    userSub.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {userSub.plan} ({userSub.status})
                                </span>
                              ) : (
                                <span className={`${pill} bg-red-100 text-red-800`}>Basic (expired)</span>
                              )}
                            </Td>
                            <Td className={colWidths.actions}>
                              <div className="flex flex-wrap gap-2">
                                {userSub ? (
                                  <>
                                    {userSub.plan === "Basic" && (
                                      <button
                                        onClick={() => upgradeSubscription(user.id)}
                                        className={`${btnPrimary} text-xs px-2 py-1`}
                                      >
                                        <FaArrowUp size={12} /> Upgrade
                                      </button>
                                    )}
                                    <button
                                      onClick={() => renewSubscription(user.id, 1)}
                                      className={`${btnPrimary} text-xs px-2 py-1`}
                                      disabled={userSub.status === "active"}
                                    >
                                      <FaSync size={12} /> Renew
                                    </button>
                                    <button
                                      onClick={() => endSubscription(user.id)}
                                      className={`${btnDanger} text-xs px-2 py-1`}
                                      disabled={userSub.status === "expired"}
                                    >
                                      <FaTimesCircle size={12} /> End
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => renewSubscription(user.id)}
                                    className={`${btnPrimary} text-xs px-2 py-1`}
                                  >
                                    <FaPlus size={12} /> Add Sub
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteUser(user.id)}
                                  className={`${btnDanger} text-xs px-2 py-1`}
                                >
                                  <FaTrash size={12} /> Delete
                                </button>
                              </div>
                            </Td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* PRODUCTS */}
            {activeTab === "products" && (
              <section className={card}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaShoppingBag className="text-emerald-500" /> Product Management
                  </h2>
                </div>

                {/* Add Product */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Add New Product
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        className={`${input} text-sm`}
                        placeholder="Product name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                      />
                      <textarea
                        className={`${input} text-sm h-24`}
                        placeholder="Product description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value
                          })
                        }
                      />
                      <select
                        className={`${input} text-sm`}
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, category: e.target.value })
                        }
                      >
                        <option value="supplements">Supplements</option>
                        <option value="equipment">Equipment</option>
                        <option value="apparel">Apparel</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          className={`${input} text-sm`}
                          placeholder="Price"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                          }
                          min="0"
                          step="0.01"
                        />
                        <input
                          type="number"
                          className={`${input} text-sm`}
                          placeholder="Stock"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, stock: e.target.value })
                          }
                          min="0"
                        />
                      </div>

                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={newProduct.inStock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              inStock: e.target.checked
                            })
                          }
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        In Stock
                      </label>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Product Image
                        </label>
                        <div className="flex items-center gap-3">
                          <label className={`${btnSecondary} text-sm cursor-pointer`}>
                            <FaImage /> Upload Image
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          {imagePreview && (
                            <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <button onClick={addNewProduct} className={`${btnPrimary} text-sm w-full`}>
                        <FaPlus size={14} /> Add Product
                      </button>
                    </div>
                  </div>
                </div>

                {/* List */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <Th className={colWidths.product}>Product</Th>
                        <Th className={colWidths.category}>Category</Th>
                        <Th className={colWidths.price}>Price</Th>
                        <Th className={colWidths.stock}>Stock</Th>
                        <Th className={colWidths.status}>Status</Th>
                        <Th className={colWidths.actions}>Actions</Th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map(product => (
                        <tr key={product.id}>
                          <Td className={colWidths.product}>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                                <img
                                  src={product.image || "https://via.placeholder.com/150"}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/150";
                                  }}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(product.description || "").slice(0, 120)}
                                  {(product.description || "").length > 120 ? "…" : ""}
                                </p>
                              </div>
                            </div>
                          </Td>
                          <Td className={`${colWidths.category} capitalize`}>
                            {product.category}
                          </Td>
                          <Td className={colWidths.price}>
                            LE{currency(product.price)}
                          </Td>
                          <Td className={colWidths.stock}>
                            <input
                              type="number"
                              min="0"
                              value={product.stock}
                              onChange={(e) => updateProductStock(product.id, e.target.value)}
                              className="w-20 px-2 py-1 rounded border border-gray-200"
                            />
                          </Td>
                          <Td className={colWidths.status}>
                            <span
                              className={`${pill} ${
                                product.inStock
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.inStock ? "IS" : "OOS"}
                            </span>
                          </Td>
                          <Td className={colWidths.actions}>
                            <div className="flex flex-wrap gap-2">
                              <button
                                className={`${btnSecondary} text-xs px-2 py-1`}
                                onClick={() => openEditProduct(product)}
                              >
                                <FaEdit size={12} /> Edit
                              </button>
                              <button
                                onClick={() => toggleProductStock(product.id)}
                                className={`${btnSecondary} text-xs px-2 py-1`}
                              >
                                {product.inStock ? (
                                  <>
                                    <FaTimesCircle size={12} /> Mark OOS
                                  </>
                                ) : (
                                  <>
                                    <FaCheckCircle size={12} /> Mark In
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className={`${btnDanger} text-xs px-2 py-1`}
                              >
                                <FaTrash size={12} /> Delete
                              </button>
                            </div>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Edit Modal */}
                {productEdit && (
                  <Modal onClose={() => setProductEdit(null)} title="Edit Product">
                    <div className="space-y-3">
                      <input
                        className={input}
                        value={productEdit.name}
                        onChange={(e) =>
                          setProductEdit({ ...productEdit, name: e.target.value })
                        }
                        placeholder="Name"
                      />
                      <textarea
                        className={`${input} h-28`}
                        value={productEdit.description}
                        onChange={(e) =>
                          setProductEdit({
                            ...productEdit,
                            description: e.target.value
                          })
                        }
                        placeholder="Description"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          className={input}
                          value={productEdit.price}
                          min="0"
                          step="0.01"
                          onChange={(e) =>
                            setProductEdit({
                              ...productEdit,
                              price: parseFloat(e.target.value || "0")
                            })
                          }
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          className={input}
                          value={productEdit.stock}
                          min="0"
                          onChange={(e) =>
                            setProductEdit({
                              ...productEdit,
                              stock: Math.max(0, parseInt(e.target.value || "0", 10))
                            })
                          }
                          placeholder="Stock"
                        />
                      </div>
                      <select
                        className={input}
                        value={productEdit.category}
                        onChange={(e) =>
                          setProductEdit({ ...productEdit, category: e.target.value })
                        }
                      >
                        <option value="supplements">Supplements</option>
                        <option value="equipment">Equipment</option>
                        <option value="apparel">Apparel</option>
                        <option value="accessories">Accessories</option>
                      </select>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={!!productEdit.inStock}
                          onChange={(e) =>
                            setProductEdit({ ...productEdit, inStock: e.target.checked })
                          }
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        In Stock
                      </label>

                      <div className="flex gap-2 justify-end pt-2">
                        <button className={btnSecondary} onClick={() => setProductEdit(null)}>
                          Cancel
                        </button>
                        <button className={btnPrimary} onClick={saveEditProduct}>
                          Save
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
              </section>
            )}

            {/* SUBSCRIPTIONS */}
            {activeTab === "subscriptions" && (
              <section className={card}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaMoneyBillWave className="text-purple-500" /> Subscription Management
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <Th className={colWidths.user}>User</Th>
                        <Th className={colWidths.plan}>Plan</Th>
                        <Th className={colWidths.status}>Status</Th>
                        <Th className={colWidths.payment}>Payment</Th>
                        <Th className={colWidths.expires}>Expires</Th>
                        <Th className={colWidths.actions}>Actions</Th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubscriptions.map(sub => {
                        const user = users.find(u => u.id === sub.userId);
                        return (
                          <tr key={sub.id}>
                            <Td className={colWidths.user}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                  <FaUserCog className="text-gray-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {user?.name || "Unknown User"}
                                  </p>
                                  <p className="text-xs text-gray-500">{user?.email || ""}</p>
                                </div>
                              </div>
                            </Td>
                            <Td className={`${colWidths.plan} text-sm text-gray-700`}>
                              {sub.plan} (LE{currency(sub.monthlyPrice)}/mo)
                            </Td>
                            <Td className={colWidths.status}>
                              <span
                                className={`${pill} ${
                                  sub.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </Td>
                            <Td className={`${colWidths.payment} capitalize text-sm text-gray-700`}>
                              {(sub.paymentMethod || "").replace("_", " ")}
                            </Td>
                            <Td className={`${colWidths.expires} text-sm text-gray-700`}>
                              {sub.expires || "—"}
                            </Td>
                            <Td className={colWidths.actions}>
                              <div className="flex flex-wrap gap-2">
                                {sub.plan === "Basic" && (
                                  <button
                                    onClick={() => upgradeSubscription(sub.userId)}
                                    className={`${btnPrimary} text-xs px-2 py-1`}
                                  >
                                    <FaArrowUp size={12} /> Upgrade
                                  </button>
                                )}
                                <button
                                  onClick={() => renewSubscription(sub.userId, 1)}
                                  className={`${btnPrimary} text-xs px-2 py-1`}
                                  disabled={sub.status === "active"}
                                >
                                  <FaSync size={12} /> Renew
                                </button>
                                <button
                                  onClick={() => endSubscription(sub.userId)}
                                  className={`${btnDanger} text-xs px-2 py-1`}
                                  disabled={sub.status === "expired"}
                                >
                                  <FaTimesCircle size={12} /> End
                                </button>
                              </div>
                            </Td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* SETTINGS */}
            {activeTab === "settings" && (
              <section className={card}>
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FaCog className="text-gray-500" /> Admin Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-800 mb-4">
                      System Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Maintenance Mode
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" />
                          <span className="ms-3 text-sm text-gray-600">
                            Enable maintenance mode
                          </span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Backup Data
                        </label>
                        <button
                          className={`${btnSecondary} text-sm`}
                          onClick={() => {
                            const blob = new Blob(
                              [
                                JSON.stringify(
                                  {
                                    users,
                                    products,
                                    subscriptions,
                                    backedUpAt: new Date().toISOString()
                                  },
                                  null,
                                  2
                                )
                              ],
                              { type: "application/json;charset=utf-8" }
                            );
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `admin-backup-${new Date()
                              .toISOString()
                              .slice(0, 10)}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                            addToast("Backup created successfully", "success");
                          }}
                        >
                          <FaDownload className="mr-2" /> Create Backup
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-800 mb-4">
                      Notification Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Notifications
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" />
                          <span className="ms-3 text-sm text-gray-600">
                            Receive email alerts
                          </span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Low Stock Threshold
                        </label>
                        <input type="number" className={`${input} text-sm w-24`} defaultValue="5" min="1" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

/* =========================================================================
 * Small UI components
 * ========================================================================= */
function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
        active ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function StatCard({ icon, label, value, secondaryValue }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-xl font-bold text-gray-900">{value}</div>
          {secondaryValue && <div className="text-xs text-gray-500 mt-1">{secondaryValue}</div>}
        </div>
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>;
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimesCircle />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Wrap the AdminDashboard with ToastProvider
export default function AdminDashboardWithToast() {
  return (
    <ToastProvider>
      <AdminDashboard />
    </ToastProvider>
  );
}