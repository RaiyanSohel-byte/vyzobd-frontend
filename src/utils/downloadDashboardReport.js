import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadDashboardReport = (dashboard) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Admin Dashboard Report", 14, 18);

  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

  autoTable(doc, {
    startY: 40,
    head: [["Metric", "Value"]],
    body: [
      ["Total Revenue", `$${dashboard.stats.totalRevenue}`],
      ["Total Orders", dashboard.stats.totalOrders],
      ["Total Products", dashboard.stats.totalProducts],
      ["Total Users", dashboard.stats.totalUsers],
    ],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Recent Orders"]],
    body: [],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 2,
    head: [["Order ID", "Customer", "Amount", "Status", "Date"]],
    body: dashboard.recentOrders.map((order) => [
      "#" + order._id.slice(-6).toUpperCase(),
      order.user?.name || order.shippingAddress?.name || "Guest",
      `$${order.total}`,
      order.orderStatus,
      new Date(order.createdAt).toLocaleDateString(),
    ]),
  });

  doc.save("dashboard-report.pdf");
};
