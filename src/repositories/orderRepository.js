import supabase from "../services/supabase";

export const orderRepository = {
  async insertOrder(orderData) {
    const { data, error } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getUserOrders(userId) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  async getOrderById(orderId) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error) throw error;
    return data;
  },
};
