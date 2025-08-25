import { createSlice, current } from "@reduxjs/toolkit";
import { userRepository } from "../repositories/userRepository";

// ------------------- Helpers -------------------
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const sessionId = getSessionId();

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

const saveCart = (state) => {
  sessionStorage.setItem(`cart_${sessionId}`, JSON.stringify(state));
};

const saveCartToServer = async (cart) => {
  try {
    const user = await userRepository.getCurrentUser();
    if (!user) return;
    await userRepository.saveUserMetadata({ cart });
  } catch (err) {
    console.error("Failed to sync cart:", err.message);
  }
};

const roundToTwo = (num) => parseFloat(num.toFixed(2));

const recalcTotals = (items) => {
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const totalCartItems = items.length;
  return { totalQuantity, totalPrice: roundToTwo(totalPrice), totalCartItems };
};

// ------------------- Slice -------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload;
      state.items = cart.items || [];
      const totals = recalcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalCartItems = totals.totalCartItems;
      state.shippingMethod = cart.shippingMethod || "pickup";
      saveCart(state);
    },

    mergeCart: (state, action) => {
      // payload: { items: [] }
      const newItems = action.payload.items || [];
      const allItems = [...state.items, ...newItems];

      // dedupe by id
      const seen = new Map();
      const mergedItems = [];
      for (const item of allItems) {
        if (!item) continue;
        if (seen.has(item.id)) {
          // sum quantity if duplicate
          seen.get(item.id).quantity += item.quantity;
        } else {
          seen.set(item.id, { ...item });
          mergedItems.push(seen.get(item.id));
        }
      }

      state.items = mergedItems;
      const totals = recalcTotals(mergedItems);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalCartItems = totals.totalCartItems;

      saveCart(state);
      saveCartToServer(current(state));
    },

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) existingItem.quantity += 1;
      else state.items.push({ ...item, quantity: 1 });

      const totals = recalcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalCartItems = totals.totalCartItems;

      saveCart(state);
      saveCartToServer(current(state));
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((i) => i.id !== itemId);
      const totals = recalcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalCartItems = totals.totalCartItems;

      saveCart(state);
      saveCartToServer(current(state));
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
    updateShippingMethod(state, action) {
      state.shippingMethod = action.payload;
      saveCart(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && (!item.stockQuantity || item.quantity < item.stockQuantity)) {
        item.quantity += 1;
      }
      const totals = recalcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalCartItems = totals.totalCartItems;

      saveCart(state);
      saveCartToServer(current(state));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);

      const totals = recalcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalCartItems = totals.totalCartItems;

      saveCart(state);
      saveCartToServer(current(state));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item || quantity <= 0) return;

      item.quantity = quantity;
      const totals = recalcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalCartItems = totals.totalCartItems;

      saveCart(state);
      saveCartToServer(current(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalCartItems = 0;
      saveCart(state);
      saveCartToServer(current(state));
    },
  },
});

export const {
  setCart,
  mergeCart,
  addToCart,
  addToCartFromDetail,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  updateShippingMethod,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selector
export const isInCart = (state, productId) =>
  state.cart.items.some((item) => item.id === productId);
