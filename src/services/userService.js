import { supabase } from "./supabaseClient";

// ✅ Get current user data
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// ✅ Update user metadata
export async function updateUserMetadata(updates) {
  const { data, error } = await supabase.auth.updateUser({
    data: updates,
  });
  if (error) throw error;
  return data.user;
}
