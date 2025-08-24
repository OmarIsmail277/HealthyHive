import supabase from "./supabase";

export async function signup({ username, email, password }) {
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
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log("hey");

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);

  return true; // <-- must return something so mutation resolves
}

export async function updateUserMetadata(updates) {
  const { data, error } = await supabase.auth.updateUser({
    data: updates, // ✅ user_metadata
  });
  if (error) throw new Error(error.message);
  return data.user;
}
