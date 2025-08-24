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
import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";
import { updateUserMetadata } from "../../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";

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
    subscription: "",
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
        subscription: user.user_metadata?.subscription || "",
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
        subscription: editData.subscription,
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

        {/* Subscription Section */}
        <div className="border-b border-gray-100 pb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Subscription Info
          </label>
          {profile.subscription?.isSubscribed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
              <p className="text-gray-800">
                Active Plan:{" "}
                <span className="font-semibold capitalize text-green-700">
                  {profile.subscription.subscriptionType}
                </span>
              </p>
              <p className="text-gray-700 mt-1">
                <span className="font-medium">
                  {profile.subscription.consultations}
                </span>{" "}
                consultations & follow ups remaining
              </p>
            </div>
          ) : (
            <p className="text-gray-500 bold">Not Subscribed</p>
          )}
        </div>
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
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    type: "Visa",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [editCardId, setEditCardId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchCards();
  }, []);

  /** Load cards from Supabase metadata **/
  async function fetchCards() {
    const { data, error } = await supabase.auth.getUser();
    if (error) return console.error(error);
    const paymentMethods = data.user?.user_metadata?.paymentMethods || [];
    setCards(paymentMethods);
    setLoading(false);
  }

  /** Update user metadata **/
  async function updatePaymentMethods(updatedCards) {
    const { error } = await supabase.auth.updateUser({
      data: { paymentMethods: updatedCards },
    });
    if (error) console.error(error);
    else setCards(updatedCards);
  }

  /** Validate new card **/
  function validateCard() {
    const newErrors = {};

    // Card Number Validation (13-19 digits)
    if (!/^\d{13,19}$/.test(newCard.number)) {
      newErrors.number = "Card number must be 13–19 digits";
    }

    // Expiry Validation (MM/YY format, future date)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(newCard.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format";
    } else {
      const [month, year] = newCard.expiry.split("/").map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;
      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiry = "Expiry date must be in the future";
      }
    }

    // CVC Validation (3–4 digits)
    if (!/^\d{3,4}$/.test(newCard.cvc)) {
      newErrors.cvc = "CVC must be 3–4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /** Add a new card **/
  async function handleAddCard() {
    if (!validateCard()) return;

    const newCardObj = {
      id: crypto.randomUUID(),
      number: `•••• •••• •••• ${newCard.number.slice(-4)}`,
      type: newCard.type,
      expiry: newCard.expiry,
      cvc: newCard.cvc,
      isDefault: cards.length === 0, // first card default
    };
    await updatePaymentMethods([...cards, newCardObj]);
    setShowAddForm(false);
    setNewCard({ number: "", type: "Visa", expiry: "", cvc: "", name: "" });
    setErrors({});
  }

  /** Set card as default **/
  async function setDefaultCard(id) {
    const updatedCards = cards.map((c) => ({ ...c, isDefault: c.id === id }));
    await updatePaymentMethods(updatedCards);
  }

  /** Remove a card **/
  async function removeCard(id) {
    const updatedCards = cards.filter((c) => c.id !== id);
    await updatePaymentMethods(updatedCards);
  }

  /** Save edited card **/
  async function saveEditCard(id) {
    const updatedCards = cards.map((c) =>
      c.id === id
        ? {
            ...c,
            ...editData,
            number: editData.number
              ? `•••• •••• •••• ${editData.number.slice(-4)}`
              : c.number,
          }
        : c
    );
    await updatePaymentMethods(updatedCards);
    setEditCardId(null);
    setEditData({});
  }

  return (
    <div className="max-w-lg mx-auto mt-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Payment Methods
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : cards.length === 0 ? (
        <p className="text-center text-gray-500">No cards saved yet.</p>
      ) : (
        cards.map((card) => (
          <div
            key={card.id}
            className="relative w-full p-6 rounded-2xl shadow-md bg-gray-50 border border-gray-200 text-gray-900 transition mb-4"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">{card.type}</span>
              {card.isDefault && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Default
                </span>
              )}
            </div>

            {/* Card Number */}
            <div className="text-xl font-mono tracking-widest mb-4">
              {card.number}
            </div>

            {/* Expiry & Actions */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Exp: {card.expiry}</span>

              <div className="flex items-center gap-2">
                {!card.isDefault && (
                  <button
                    onClick={() => setDefaultCard(card.id)}
                    className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium hover:bg-yellow-200 transition text-sm"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => removeCard(card.id)}
                  className="p-2 text-red-400 hover:text-red-600"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {!showAddForm ? (
        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Card
        </button>
      ) : (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Add New Card
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.number ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="1234 5678 9012 3456"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>

            {/* Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.expiry ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={(e) =>
                  setNewCard({ ...newCard, expiry: e.target.value })
                }
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>

            {/* CVC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.cvc ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="123"
                value={newCard.cvc}
                onChange={(e) =>
                  setNewCard({ ...newCard, cvc: e.target.value })
                }
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
              )}
            </div>

            {/* Name on Card */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Alex Green"
                value={newCard.name}
                onChange={(e) =>
                  setNewCard({ ...newCard, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setShowAddForm(false);
                setErrors({});
              }}
              className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCard}
              className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm"
            >
              Save Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
