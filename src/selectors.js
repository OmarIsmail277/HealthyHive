// userSelectors

export const getUserMetadata = (user) => {
  return user?.user_metadata || {};
};

export const getUserCart = (user) => {
  return getUserMetadata(user)?.cart || {};
};
export const getUserWishlist = (user) => {
  return getUserMetadata(user)?.wishlist || {};
};
