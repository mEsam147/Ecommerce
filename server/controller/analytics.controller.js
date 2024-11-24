import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getAnalytics = async (req, res) => {
  try {
    // Count total users, products, and orders
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    // Aggregate sales data
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const { totalSales, totalRevenue } = salesData[0] || {
      totalSales: 0,
      totalRevenue: 0,
    };

    // Calculate daily sales for the last 30 days
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    // Create an array of dates for the last 30 days
    function getDatesInRange(startDate, endDate) {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }

    const dateArray = getDatesInRange(startDate, endDate);

    // Map the dates to daily sales data
    const dailySalesData = dateArray.map((date) => {
      const daySales = dailySales.find((sale) => {
        return sale._id === date.toISOString().split("T")[0];
      });
      return {
        date: date.toISOString().split("T")[0],
        totalSales: daySales?.totalSales || 0,
        totalRevenue: daySales?.totalRevenue || 0,
      };
    });

    // Send response with analytics data
    res.status(200).json({
      userCount,
      productCount,
      orderCount,
      totalSales,
      totalRevenue,
      dailySales: dailySalesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
