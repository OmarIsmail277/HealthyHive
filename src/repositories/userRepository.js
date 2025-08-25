import supabase from "../services/supabase";

export const userRepository = {
  queryKey: "user",

  // ✅ Get current user
  async getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data.user;
  },

  // ✅ Update user metadata
  async saveUserMetadata(updates) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error("User not found");

    const newMetadata = {
      ...user.user_metadata,
      ...updates,
    };

    const { data, error } = await supabase.auth.updateUser({
      data: newMetadata, // ✅ user_metadata
    });

    if (error) throw new Error(error.message);
    return data.user;
  },

  // ✅ Signup
  async signupUser({ username, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar: "",
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          paymentMethods: [],
          cart: {},
          wishlist: {}, // key-> id, value -> product
          subscription: {
            isSubscribed: false,
            subscriptionType: "",
            consultations: 0,
          },
        },
      },
    });

    if (error) throw new Error(error.message);
    return data;
  },

  // ✅ Login
  async loginUser({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    console.log(data);
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: true, // ⛔ Prevent redirect in the current tab
      },
    });

    if (error) {
      console.error(error.message);
    } else if (data?.url) {
      // 👇 Open a centered popup window for Google login
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        data.url,
        "googleLogin",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (popup) popup.focus();

      // 👂 Listen for the message sent from AuthCallback
      window.addEventListener("message", (event) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === "oauth-success") {
          console.log("✅ Logged in:", event.data.session);
          popup.close();
          window.location.href = "/"; // Redirect to home after login
        }
      });
    }
  }

  ,

  // ✅ Logout
  async logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);

    return true; // <-- must return something so mutation resolves
  },
};
