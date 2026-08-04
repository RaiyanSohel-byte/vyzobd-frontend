export const exportOrdersToCSV = (orders) => {
  if (!orders.length) return;

  const headers = [
    "Order ID",
    "Customer Name",
    "Customer Email",
    "Date",
    "Items",
    "Subtotal",
    "Shipping",
    "Tax",
    "Total",
    "Payment Status",
    "Order Status",
  ];

  const rows = orders.map((order) => [
    order._id,
    order.user?.name || "",
    order.user?.email || "",
    new Date(order.createdAt).toLocaleDateString(),
    order.items?.length || 0,
    order.subtotal,
    order.shippingFee,
    order.tax,
    order.total,
    order.paymentStatus,
    order.orderStatus,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((item) => `"${item ?? ""}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};
