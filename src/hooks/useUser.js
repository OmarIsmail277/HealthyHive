import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { userRepository } from "../repositories/userRepository.js";
import { orderRepository } from "../repositories/orderRepository";
import { setCart, clearCart } from "../store/cartSlice.js";
import { setWishlist, clearWishlist } from "../store/wishlistSlice.js";
import { getUserCart, getUserWishlist } from "../selectors.js";

/* ------------------------ GUEST HELPERS ------------------------ */

const getSessionId = () => {
  let id = sessionStorage.getItem("sessionId");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("sessionId", id);
  }
  return id;
};

const loadGuestCart = () => {
  const sessionId = getSessionId();
  try {
    const raw = sessionStorage.getItem(`cart_${sessionId}`);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const loadGuestWishlist = () => {
  const sessionId = getSessionId();
  try {
    const raw = sessionStorage.getItem(`wishlist_${sessionId}`);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveGuestCart = (cart) => {
  const sessionId = getSessionId();
  sessionStorage.setItem(`cart_${sessionId}`, JSON.stringify(cart));
};

const saveGuestWishlist = (wishlist) => {
  const sessionId = getSessionId();
  sessionStorage.setItem(`wishlist_${sessionId}`, JSON.stringify(wishlist));
};

const dedupeById = (items = []) => {
  const seen = new Set();
  return items.filter(
    (item) => item && !seen.has(item.id) && seen.add(item.id)
  );
};

const recalcCartTotals = (items) => {
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return {
    totalQuantity,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalCartItems: items.length,
  };
};

/** Merge guest into user */
async function mergeGuestIntoUser({ user, dispatch }) {
  const serverCart = (await getUserCart(user)) || { items: [] };
  const serverWishlist = (await getUserWishlist(user)) || { items: [] };

  const guestCart = loadGuestCart();
  const guestWishlist = loadGuestWishlist();

  // Merge without losing duplicates
  const mergedCartItems = dedupeById([...serverCart.items, ...guestCart.items]);
  const mergedWishlistItems = dedupeById([
    ...serverWishlist.items,
    ...guestWishlist.items,
  ]);

  const cartTotals = recalcCartTotals(mergedCartItems);

  const mergedCart = {
    ...serverCart,
    items: mergedCartItems,
    ...cartTotals,
    shippingMethod: serverCart.shippingMethod || "pickup",
  };

  const mergedWishlist = {
    ...serverWishlist,
    items: mergedWishlistItems,
    totalItemsInWishlist: mergedWishlistItems.length,
  };

  // Save to Supabase
  await userRepository.saveUserMetadata({
    cart: mergedCart,
    wishlist: mergedWishlist,
  });

  // Update Redux
  dispatch(setCart(mergedCart));
  dispatch(setWishlist(mergedWishlist));

  // Optional: clear guest cart/wishlist after merge
  // Comment these out if you want the guest cart to persist for multiple logins
  sessionStorage.removeItem(`cart_${getSessionId()}`);
  sessionStorage.removeItem(`wishlist_${getSessionId()}`);
}

/* ----------------------------- Hooks ----------------------------- */

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: [userRepository.queryKey],
    queryFn: userRepository.getCurrentUser,
  });
  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates) => userRepository.saveUserMetadata(updates),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData([userRepository.queryKey], updatedUser);
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      userRepository.loginUser({ email, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [userRepository.queryKey],
      });
      const user = await userRepository.getCurrentUser();
      if (!user) {
        toast.error("Login succeeded but user not available yet.");
        return;
      }

      try {
        await mergeGuestIntoUser({ user, dispatch });
      } catch (err) {
        console.error("Merge failed:", err);
        toast.error("Could not merge guest cart/wishlist.");
      }

      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error("Incorrect email or password", err);
    },
  });

  return { login, isPending };
}

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: userRepository.signupUser,
    onSuccess: () => {
      toast.success("Account created! Verify your email address.");
      queryClient.invalidateQueries({ queryKey: [userRepository.queryKey] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isPending };
}

export function useCheckoutLogin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      userRepository.loginUser({ email, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [userRepository.queryKey],
      });
      const user = await userRepository.getCurrentUser();
      if (user) {
        try {
          await mergeGuestIntoUser({ user, dispatch });
        } catch (err) {
          toast.error("Could not merge guest cart/wishlist.", err);
        }
      }
    },
    onError: (err) => toast.error("Incorrect email or password", err),
  });

  return { login, isPending };
}

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: userRepository.logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [userRepository.queryKey] });
      dispatch(clearCart());
      dispatch(clearWishlist());
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
      dispatch(clearCart());
      await userRepository.saveUserMetadata({ cart: {} });
      toast.success("Processing order...", { duration: 2000 });
    },
    onError: (err) => toast.error(`Order failed: ${err.message}`),
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
