export const FREE_DELIVERY = "Free delivery";
export const CASH_ON_DELIVERY = "Cash on delivery";
export const STANDARD_DELIVERY_FEE = 130;

export const isFreeDelivery = (product) =>
  product?.delivery_status === FREE_DELIVERY ||
  product?.deliveryStatus === FREE_DELIVERY;

export const getDeliveryStatus = (product) =>
  isFreeDelivery(product) ? FREE_DELIVERY : CASH_ON_DELIVERY;

export const getCartDelivery = (cart) => {
  const isFree = cart.length > 0 && cart.every(isFreeDelivery);
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.after_discount_price || 0) * item.quantity,
    0,
  );
  const deliveryFee = isFree ? 0 : STANDARD_DELIVERY_FEE;

  return {
    isFreeDelivery: isFree,
    deliveryFee,
    subtotal,
    total: subtotal + deliveryFee,
    advanceAmount: isFree ? subtotal : deliveryFee,
    remainingAmount: isFree ? 0 : subtotal,
  };
};
