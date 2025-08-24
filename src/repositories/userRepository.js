import * as apiAuth from "../services/apiAuth";

export const userRepository = {
  queryKey: "user",

  // ✅ Get current user
  async fetchCurrentUser() {
    return await apiAuth.getCurrentUser();
  },

  // ✅ Update user metadata
  async saveUserMetadata(updates) {
    return await apiAuth.updateUserMetadata(updates);
  },

  // ✅ Signup
  async signupUser({ username, email, password }) {
    return await apiAuth.signup({ username, email, password });
  },

  // ✅ Login
  async loginUser({ email, password }) {
    return await apiAuth.login({ email, password });
  },

  // ✅ Logout
  async logoutUser() {
    return await apiAuth.logout();
  },
};
