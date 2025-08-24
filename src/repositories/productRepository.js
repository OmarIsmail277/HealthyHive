import supabase from "../services/supabase";

export const productRepository = {
  queryKey: "products",

  async getAll() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getBySKUs(SKUs) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("SKU", SKUs);
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  },

  async create(product) {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, product) {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },
};
