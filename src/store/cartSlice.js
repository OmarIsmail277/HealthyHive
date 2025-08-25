import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { userRepository } from "../repositories/userRepository";

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
    : {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        totalCartItems: 0,
        shippingMethod: "pickup",
      };
};

// Save cart to sessionStorage
const saveCart = (state) => {
  sessionStorage.setItem(`cart_${sessionId}`, JSON.stringify(state));
};

const saveCartToServer = async (cart) => {
  try {
    const user = await userRepository.getCurrentUser();
    if (!user) return;

    const plainCart = JSON.parse(JSON.stringify(cart));

    await userRepository.saveUserMetadata({ cart: plainCart });
  } catch (err) {
    console.error("Failed to sync cart:", err.message);
  }
};

const roundToTwo = (num) => parseFloat(num.toFixed(2));

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload;

      state.items = cart.items || [];
      state.totalQuantity = cart.totalQuantity || 0;
      state.totalPrice = cart.totalPrice || 0;
      state.totalCartItems = cart.totalCartItems || 0;

      // save locally
      saveCart(state);
    },

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

      // CheckStockStatus and StockQuantity => AddtoCart, PlaceOrder, Checkout, CartPageCounter

      // save locally
      saveCart(state);

      // save to supabase
      // saveCartToServer(
      //   state.items.reduce((acc, item) => {
      //     acc[item.id] = { quantity: item.quantity };
      //     return acc;
      //   }, {})
      // );

      saveCartToServer(current(state));
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
        // saveCartToServer(
        //   state.items.reduce((acc, item) => {
        //     acc[item.id] = { quantity: item.quantity };
        //     return acc;
        //   }, {})
        // );
        saveCartToServer(current(state));
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity < item.stockQuantity) {
          item.quantity += 1;
          state.totalQuantity += 1;
          state.totalPrice = roundToTwo(state.totalPrice + item.price);
          saveCart(state);
          // saveCartToServer(
          //   state.items.reduce((acc, item) => {
          //     acc[item.id] = { quantity: item.quantity };
          //     return acc;
          //   }, {})
          // );
          saveCartToServer(current(state));
        }
      }
    },

    addToCartFromDetail: (state, action) => {
      const { id, count, product } = action.payload;
      const item = state.items.find((i) => i.id === id);
      const finalPrice = product.price - product.discount;

      if (item) {
        // update existing item, but don't touch totalCartItems
        const addable = Math.min(count, item.stockQuantity - item.quantity);

        if (addable > 0) {
          item.quantity += addable;
          state.totalQuantity += addable;
          state.totalPrice = roundToTwo(
            state.totalPrice + finalPrice * addable
          );
        }
      } else {
        // new product → increment totalCartItems
        state.items.push({ ...product, price: finalPrice, quantity: count });
        state.totalQuantity += count;
        state.totalPrice = roundToTwo(state.totalPrice + finalPrice * count);
        state.totalCartItems += 1;
      }

      saveCart(state);
      // saveCartToServer(
      //   state.items.reduce((acc, item) => {
      //     acc[item.id] = { quantity: item.quantity };
      //     return acc;
      //   }, {})
      // );
      saveCartToServer(current(state));
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
      // saveCartToServer(
      //   state.items.reduce((acc, item) => {
      //     acc[item.id] = { quantity: item.quantity };
      //     return acc;
      //   }, {})
      // );
      saveCartToServer(current(state));
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
        // saveCartToServer(
        //   state.items.reduce((acc, item) => {
        //     acc[item.id] = { quantity: item.quantity };
        //     return acc;
        //   }, {})
        // );
        saveCartToServer(current(state));
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
      // saveCartToServer(
      //   state.items.reduce((acc, item) => {
      //     acc[item.id] = { quantity: item.quantity };
      //     return acc;
      //   }, {})
      // );
      saveCartToServer(current(state));
    },

    updateShippingMethod(state, action) {
      state.shippingMethod = action.payload;
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalCartItems = 0;
      saveCart(state);
      // saveCartToServer(
      //   state.items.reduce((acc, item) => {
      //     acc[item.id] = { quantity: item.quantity };
      //     return acc;
      //   }, {})
      // );
      saveCartToServer(current(state));
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
  addToCartFromDetail,
  updateShippingMethod,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const isInCart = (state, productId) =>
  state.cart.items.some((item) => item.id === productId);
