import { createSlice } from "@reduxjs/toolkit";

const roundToTwo = (num) => parseFloat(num.toFixed(2));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    totalCartItems: 0,
  },
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
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice = roundToTwo(state.totalPrice + item.price);
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
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalCartItems = 0;
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
