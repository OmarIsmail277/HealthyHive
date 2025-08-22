import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products could not be retrieved");
  }

  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be deleted");
  }

  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't retrieve product");
  }

  return data;
}

export async function getProductBySKUs(SKUs) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("SKU", SKUs);

  if (error) {
    console.error(error);
    throw new Error("Couldn't retrieve product by SKU");
  }

  return data;
}
