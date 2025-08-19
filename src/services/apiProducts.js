import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  
  return data;
} 
