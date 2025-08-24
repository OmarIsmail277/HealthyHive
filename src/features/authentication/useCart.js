import supabase from "../../services/supabase";

// save cart in user metadata
export const saveCartToMetadata = async (cart) => {
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError || !user) {
    console.error("User not logged in", getUserError);
    return;
  }

  const { error } = await supabase.auth.updateUser({
    data: { cart }, // add cart to data including other already placed data
  });

  if (error) console.error("Error saving cart metadata:", error);
};

// fetch cart from user metadata
export const fetchCartFromMetadata = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user.user_metadata?.cart || null; // login, onMount -> useEffect
};
