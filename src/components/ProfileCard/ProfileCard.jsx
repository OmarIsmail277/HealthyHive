// ProfileWrapper.jsx
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaUserEdit,
  FaCreditCard,
  FaHistory,
  FaQuestionCircle,
  FaChevronRight,
  FaFire,
  FaDumbbell,
  FaHeartbeat,
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

// 👉 Import the new components
import Dashboard from "../Dashboard/Dashboard";
import OrderHistory from "../OrderHistory/OrderHistory";
import { useUser } from "../../features/authentication/useUser";
import { useState, useEffect } from "react";
import { updateUserMetadata } from "../../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";

// Wrapper page that hosts the layout and switches between views
export default function ProfileWrapper() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const handleNavigation = (view) => {
    setActiveView(view);
    if (view === "faq") navigate("/faq");
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />; // ⬅️ now a separate component
      case "personal":
        return <PersonalInformationView />;
      case "payments":
        return <PaymentMethodsView />;
      case "orders":
        return <OrderHistory />; // ⬅️ now a separate component
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow">
              <FaUserCircle className="text-xl" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2 text-gray-700 text-sm"
          >
            <FaSignOutAlt size={14} /> Log Out
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4 min-w-0">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
              <h2 className="text-md font-semibold text-gray-900 mb-3">
                Navigation
              </h2>
              <nav className="space-y-1">
                <ProfileNavItem
                  icon={<FaHome className="text-green-500" />}
                  label="Dashboard"
                  active={activeView === "dashboard"}
                  onClick={() => handleNavigation("dashboard")}
                />
                <ProfileNavItem
                  icon={<FaUserEdit className="text-blue-500" />}
                  label="Personal Information"
                  active={activeView === "personal"}
                  onClick={() => handleNavigation("personal")}
                />
                <ProfileNavItem
                  icon={<FaCreditCard className="text-purple-500" />}
                  label="Payment Methods"
                  active={activeView === "payments"}
                  onClick={() => handleNavigation("payments")}
                />
                <ProfileNavItem
                  icon={<FaHistory className="text-orange-500" />}
                  label="Order History"
                  active={activeView === "orders"}
                  onClick={() => handleNavigation("orders")}
                />
                <ProfileNavItem
                  icon={<FaQuestionCircle className="text-yellow-500" />}
                  label="FAQ & Support"
                  active={activeView === "faq"}
                  onClick={() => handleNavigation("faq")}
                />
              </nav>
            </div>

            {activeView === "dashboard" && (
              <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
                <h2 className="text-md font-semibold text-gray-900 mb-3">
                  Quick Stats
                </h2>
                <div className="space-y-2">
                  <MiniStat
                    icon={<FaFire className="text-orange-500" />}
                    label="Current Streak"
                    value="3 days"
                  />
                  <MiniStat
                    icon={<FaDumbbell className="text-blue-500" />}
                    label="Weekly Workouts"
                    value="4/5"
                  />
                  <MiniStat
                    icon={<FaHeartbeat className="text-red-500" />}
                    label="Avg. Daily Calories"
                    value="2,150"
                  />
                </div>
              </div>
            )}
          </aside>

          {/* Content */}
          <section className="lg:col-span-3 min-w-0">
            {renderActiveView()}
          </section>
        </div>
      </main>
    </div>
  );
}

/* ---------- Local helpers for the wrapper ---------- */

function ProfileNavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-2.5 rounded-lg transition text-left ${
        active ? "bg-green-50 text-green-700" : "hover:bg-gray-50 text-gray-700"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${
            active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
          }`}
        >
          {icon}
        </div>
        <span className="text-sm truncate">{label}</span>
      </div>
      <FaChevronRight className="text-xs text-gray-400 flex-shrink-0" />
    </button>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="p-3 rounded-lg bg-gray-50 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500 truncate">{label}</div>
        <div className="text-base font-bold text-gray-900 truncate">
          {value}
        </div>
      </div>
    </div>
  );
}

/* ---------- Keep these two views inline (unchanged functional behavior) ---------- */
/* You can split them later if you like. */

// Personal Information
function PersonalInformationView() {
  const { user, isPending } = useUser();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
  });

  const [editData, setEditData] = useState(profile);

  useEffect(() => {
    if (user) {
      const data = {
        firstName: user.user_metadata?.firstName || "",
        lastName: user.user_metadata?.lastName || "",
        phone: user.user_metadata?.phone || "",
        address: user.user_metadata?.address || "",
        email: user.email || "",
      };
      setProfile(data);
      setEditData(data);
    }
  }, [user]);

  const handleChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updated = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        phone: editData.phone,
        address: editData.address,
      };
      await updateUserMetadata(updated);
      queryClient.invalidateQueries(["user"]);
      setProfile(editData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          Personal Information
        </h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 text-sm"
          >
            <FaEdit size={14} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <FieldBlock
          label="First Name"
          isEditing={isEditing}
          value={editData.firstName}
          name="firstName"
          onChange={handleChange}
        />
        <FieldBlock
          label="Last Name"
          isEditing={isEditing}
          value={editData.lastName}
          name="lastName"
          onChange={handleChange}
        />
        <FieldBlock
          label="Email Address"
          isEditing={false} // ❌ Email read-only
          value={editData.email}
          name="email"
        />
        <FieldBlock
          label="Phone Number"
          isEditing={isEditing}
          value={editData.phone}
          name="phone"
          onChange={handleChange}
        />
        <FieldBlock
          label="Address"
          isEditing={isEditing}
          value={editData.address}
          name="address"
          onChange={handleChange}
          as="textarea"
          rows={3}
        />
      </div>
    </div>
  );
}

function FieldBlock({
  label,
  isEditing,
  as = "input",
  value,
  onChange,
  name,
  ...rest
}) {
  return (
    <div className="border-b border-gray-100 pb-4">
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>
      {isEditing ? (
        as === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            {...rest}
            className="outline-none w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        ) : (
          <input
            name={name}
            value={value}
            onChange={onChange}
            {...rest}
            className="outline-none w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        )
      ) : (
        <p className="text-gray-900 break-words whitespace-pre-line">{value}</p>
      )}
    </div>
  );
}

function PaymentMethodsView() {
  const [cards, setCards] = useState([
    {
      id: 1,
      number: "•••• •••• •••• 4242",
      type: "Visa",
      expiry: "12/24",
      isDefault: true,
    },
    {
      id: 2,
      number: "•••• •••• •••• 5555",
      type: "Mastercard",
      expiry: "06/25",
      isDefault: false,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    type: "Visa",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleAddCard = () => {
    const newId = Math.max(...cards.map((c) => c.id), 0) + 1;
    setCards([
      ...cards,
      {
        id: newId,
        number: `•••• •••• •••• ${newCard.number.slice(-4)}`,
        type: newCard.type,
        expiry: newCard.expiry,
        isDefault: false,
      },
    ]);
    setShowAddForm(false);
    setNewCard({ number: "", type: "Visa", expiry: "", cvc: "", name: "" });
  };

  const setDefaultCard = (id) => {
    setCards(cards.map((card) => ({ ...card, isDefault: card.id === id })));
  };

  const removeCard = (id) => setCards(cards.filter((card) => card.id !== id));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900">Payment Methods</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 text-sm"
        >
          <FaPlus size={14} /> Add Card
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Add New Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={newCard.number}
              onChange={(e) =>
                setNewCard({ ...newCard, number: e.target.value })
              }
            />
            <Select
              label="Card Type"
              value={newCard.type}
              onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
              options={["Visa", "Mastercard", "American Express"]}
            />
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              value={newCard.expiry}
              onChange={(e) =>
                setNewCard({ ...newCard, expiry: e.target.value })
              }
            />
            <Input
              label="CVC"
              placeholder="123"
              value={newCard.cvc}
              onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
            />
            <Input
              className="md:col-span-2"
              label="Name on Card"
              placeholder="Alex Green"
              value={newCard.name}
              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCard}
              className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm"
            >
              Save Card
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {cards.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No payment methods saved
          </p>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-medium">{card.type}</span>
                    <span className="truncate">{card.number}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Expires {card.expiry}
                  </div>
                </div>
                <div className="flex gap-2">
                  {card.isDefault ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefaultCard(card.id)}
                      className="px-2 py-1 text-xs text-gray-600 hover:text-green-600"
                    >
                      Set as default
                    </button>
                  )}
                  <button
                    onClick={() => removeCard(card.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function Input({ label, className = "", ...rest }) {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          {...rest}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    );
  }
  function Select({ label, options = [], ...rest }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          {...rest}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
