import { createSlice } from "@reduxjs/toolkit";

// get sessionId or create one for guest
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const sessionId = getSessionId();

// Load cart from sessionStorage
const loadCart = () => {
  const savedCart = sessionStorage.getItem(`cart_${sessionId}`);
  return savedCart
    ? JSON.parse(savedCart)
    : { items: [], totalQuantity: 0, totalPrice: 0, totalCartItems: 0 };
};

// Save cart to sessionStorage
const saveCart = (state) => {
  sessionStorage.setItem(`cart_${sessionId}`, JSON.stringify(state));
};

const roundToTwo = (num) => parseFloat(num.toFixed(2));

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
        state.totalCartItems += 1;
      }

      state.totalQuantity += 1;
      state.totalPrice = roundToTwo(state.totalPrice + item.price);

      saveCart(state);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice = roundToTwo(
          state.totalPrice - item.price * item.quantity
        );
        state.items = state.items.filter((i) => i.id !== itemId);
        state.totalCartItems -= 1;
        saveCart(state);
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice = roundToTwo(state.totalPrice + item.price);
        saveCart(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice = roundToTwo(state.totalPrice - item.price);
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
        state.totalQuantity -= 1;
        state.totalPrice = roundToTwo(state.totalPrice - item.price);
        state.totalCartItems -= 1;
      }
      saveCart(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item && quantity > 0) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice = roundToTwo(
          state.totalPrice + (quantity - item.quantity) * item.price
        );
        item.quantity = quantity;
        saveCart(state);
      }
    },

    toggleCartItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        // remove
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice = roundToTwo(
          state.totalPrice - existingItem.price * existingItem.quantity
        );
        state.items = state.items.filter((i) => i.id !== item.id);
        state.totalCartItems -= 1;
      } else {
        // add
        state.items.push({ ...item, quantity: 1 });
        state.totalQuantity += 1;
        state.totalPrice = roundToTwo(state.totalPrice + item.price);
        state.totalCartItems += 1;
      }
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalCartItems = 0;
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  toggleCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
