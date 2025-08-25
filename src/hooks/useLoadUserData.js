import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserCart, getUserWishlist } from "../selectors";
import { userRepository } from "../repositories/userRepository";
import { setCart } from "../store/cartSlice";
import { setWishlist } from "../store/wishlistSlice";

export function useLoadUserData() {
  const dispatch = useDispatch();

  const { data: user } = useQuery({
    queryKey: [userRepository.queryKey],
    queryFn: () => userRepository.getCurrentUser(),
  });

  useEffect(() => {
    if (!user) return;

    // Wishlist
    const wishlist = getUserWishlist(user);
    if (wishlist?.items?.length > 0) {
      dispatch(setWishlist(wishlist));
    }

    // Cart
    const cart = getUserCart(user);
    if (cart?.items?.length > 0) {
      dispatch(setCart(cart));
    }
  }, [user, dispatch]);
}
