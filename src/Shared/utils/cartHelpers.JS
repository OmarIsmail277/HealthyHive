export const roundToTwo = (num) =>
  parseFloat((Math.round(num * 100) / 100).toFixed(2));

export function computeCartTotals(items) {
  const totalQuantity = items.reduce((acc, i) => acc + (i.quantity || 0), 0);
  const totalPrice = roundToTwo(
    items.reduce((acc, i) => acc + (i.quantity || 0) * (i.price || 0), 0)
  );
  const totalCartItems = items.length;
  return { totalQuantity, totalPrice, totalCartItems };
}

export function mergeCartItems(guestItems, userItems) {
  const merged = [...(userItems || [])];
  (guestItems || []).forEach((g) => {
    const idx = merged.findIndex((u) => u.id === g.id);
    if (idx >= 0) {
      const maxStock =
        merged[idx].stockQuantity ?? g.stockQuantity ?? Number.MAX_SAFE_INTEGER;
      const nextQty = Math.min(
        (merged[idx].quantity || 0) + (g.quantity || 0),
        maxStock
      );
      merged[idx] = { ...merged[idx], quantity: nextQty };
    } else {
      merged.push({ ...g });
    }
  });
  return merged;
}

export function mergeWishlistItems(guestItems, userItems) {
  const merged = [...(userItems || [])];
  (guestItems || []).forEach((g) => {
    if (!merged.some((u) => u.id === g.id)) merged.push(g);
  });
  return merged;
}
