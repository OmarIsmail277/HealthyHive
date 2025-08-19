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

// Load wishlist from sessionStorage
const loadWishlist = () => {
  const savedWishlist = sessionStorage.getItem(`wishlist_${sessionId}`);
  return savedWishlist
    ? JSON.parse(savedWishlist)
    : { items: [], totalItemsInWishlist: 0 };
};

// Save wishlist to sessionStorage
const saveWishlist = (state) => {
  sessionStorage.setItem(`wishlist_${sessionId}`, JSON.stringify(state));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);

      if (!exists) {
        state.items.push(item);
        state.totalItemsInWishlist = state.items.length;
        saveWishlist(state);
      }
    },

    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((i) => i.id !== itemId);
      state.totalItemsInWishlist = state.items.length;
      saveWishlist(state);
    },

    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);

      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id);
      } else {
        state.items.push(item);
      }
      state.totalItemsInWishlist = state.items.length;
      saveWishlist(state);
    },

    clearWishlist: (state) => {
      state.items = [];
      state.totalItemsInWishlist = 0;
      saveWishlist(state);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
