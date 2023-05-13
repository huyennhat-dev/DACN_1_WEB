export const formattedPrice = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
