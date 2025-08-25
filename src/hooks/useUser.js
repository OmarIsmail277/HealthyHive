import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userRepository } from "../repositories/userRepository.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { clearCart, setCart } from "../store/cartSlice.js";
import { getUserCart, getUserWishlist } from "../selectors.js";
import { setWishlist } from "../store/wishlistSlice.js";
import { orderRepository } from "../repositories/orderRepository";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: [userRepository.queryKey],
    queryFn: userRepository.getCurrentUser,
  });

  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}

// update user info
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates) => userRepository.saveUserMetadata(updates),
    onSuccess: (updatedUser) => {
      // invalidate and update user Cache
      queryClient.setQueryData([userRepository.queryKey], updatedUser);
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      userRepository.loginUser({ email, password }),
    onSuccess: async () => {
      // queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries({ queryKey: [userRepository.queryKey] });
      const user = await userRepository.getCurrentUser();

      const cart = await getUserCart(user);
      const wishlist = await getUserWishlist(user);

      const plainCart = JSON.parse(JSON.stringify(cart));
      const plainWishlist = JSON.parse(JSON.stringify(wishlist));

      dispatch(setCart(plainCart));
      dispatch(setWishlist(plainWishlist));

      navigate("/", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR ", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: userRepository.signupUser,
    onSuccess: () => {
      toast.success(
        "Account Successfully created! Please verify your email address"
      );
      queryClient.invalidateQueries({ queryKey: userRepository.queryKey }); // refresh user
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isPending };
}

export function useCheckoutLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      userRepository.loginUser({ email, password }),
    onSuccess: () => {
      // Invalidate user query so data stays up-to-date
      queryClient.invalidateQueries({ queryKey: userRepository.queryKey }); // refresh user
      // Do NOT navigate; component will handle next step
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect ", err);
    },
  });

  return { login, isPending };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: userRepository.logoutUser,
    onSuccess: () => {
      // queryClient.removeQueries();
      queryClient.removeQueries({ queryKey: [userRepository.queryKey] });

      dispatch(clearCart());

      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}

export function useCheckout() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: orderRepository.insertOrder,

    onSuccess: async () => {
      // 1. clear local cart
      dispatch(clearCart());

      //2. clear server cart
      await userRepository.saveUserMetadata({ cart: {} });

      // 3. success toast
      toast.success("Processing order..", { duration: 2000 });
    },
    onError: (err) => {
      toast.error(`Order failed : ${err.message}`);
    },
  });
}

export function useOrders() {
  const { user } = useUser();

  return useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => orderRepository.getUserOrders(user?.id),
    enabled: !!user?.id,
  });
}

export function useOrder(orderId) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderRepository.getOrderById(orderId),
    enabled: !!orderId,
  });
}
