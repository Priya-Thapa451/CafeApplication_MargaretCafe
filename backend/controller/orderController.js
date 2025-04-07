import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, paymentMethod, orderType } = req.body;

    // Validate input
    if (!address || !paymentMethod || !orderType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch or update customer address
    let customer = await prisma.customer.findUnique({ where: { userId } });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer = await prisma.customer.update({
      where: { userId },
      data: { address },
    });

    // Get cart items
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { menu: true },
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Fixed delivery charge for all orders within Pokhara Valley
    const deliveryCharge = 150;

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.menu.price,
      0
    );

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount:
          totalAmount + (orderType === "DELIVERY" ? deliveryCharge : 0),
        paymentMethod,
        address,
        orderType,
        status: "PENDING",
        deliveryCharge: orderType === "DELIVERY" ? deliveryCharge : 0,
        items: {
          create: cartItems.map((item) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            price: item.menu.price,
          })),
        },
      },
      include: { items: true },
    });

    // Clear cart after order placement
    await prisma.cart.deleteMany({ where: { userId } });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};
