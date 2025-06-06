import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {
    const [users, orders, menus,  recentOrders, ordersByDate] =
      await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.menu.count(),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: {
            user: true,
            items: { include: { menu: true } },
          },
        }),
        prisma.order.groupBy({
          by: ["createdAt"],
          _count: { _all: true },
          orderBy: { createdAt: "asc" },
        }),
      ]);

    const chartData = ordersByDate.map((entry) => ({
      month: entry.createdAt.toISOString().split("T")[0], // Format as YYYY-MM-DD
      total: entry._count._all,
    }));

    res.json({
      totalUsers: users,
      totalOrders: orders,
      totalProducts: menus,
      recentOrders,
      orderGraph: chartData, // Ensure this key is consistent with frontend data usage
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Failed to load dashboard stats." });
  }
};