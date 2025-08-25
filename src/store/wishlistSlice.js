import { createSlice, current } from "@reduxjs/toolkit";
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

const saveWishlistToServer = async (wishlist) => {
  try {
    const user = await userRepository.getCurrentUser();
    if (!user) return;

    const plainWishlist = JSON.parse(JSON.stringify(wishlist));

    await userRepository.saveUserMetadata({ wishlist: plainWishlist });
  } catch (err) {
    console.error("Failed to sync cart:", err.message);
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),
  reducers: {
    setWishlist: (state, action) => {
      const wishList = action.payload;

      state.items = wishList.items || [];
      state.totalItemsInWishlist = wishList.totalItemsInWishlist || 0;
      // save locally
      saveWishlist(state);
    },
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);

      if (!exists) {
        state.items.push(item);
        state.totalItemsInWishlist = state.items.length;
        saveWishlist(state);
        saveWishlistToServer(current(state));
      }
    },

    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((i) => i.id !== itemId);
      state.totalItemsInWishlist = state.items.length;
      saveWishlistToServer(current(state));
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
      saveWishlistToServer(current(state));
      saveWishlist(state);
    },

    clearWishlist: (state) => {
      state.items = [];
      state.totalItemsInWishlist = 0;
      saveWishlistToServer(current(state));
      saveWishlist(state);
    },
  },
});

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
