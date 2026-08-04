export const exportProductsToCSV = (products) => {
  const rows = products.map((p) => ({
    Title: p.title,
    Category: p.category,
    Price: p.price,
    Discount: p.discount,
    Stock: p.stock,
    Rating: p.rating,
    Featured: p.isFeatured ? "Yes" : "No",
  }));

  const csv = [
    Object.keys(rows[0]).join(","),
    ...rows.map((row) => Object.values(row).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "products.csv";

  link.click();

  URL.revokeObjectURL(url);
};
