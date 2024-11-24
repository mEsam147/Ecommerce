import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cuboid, DollarSign, ShoppingCart, User } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "../../utils/Axios";

interface AnalyticsData {
  id: number;
  name: string;
  count: number | string;
  icon: React.ReactElement;
}
interface DailySale {
  date: string;
  totalSales: number;
  totalRevenue: number;
}
interface AnalyticsProps {
  // Add any additional props needed here
  userCount: number;
  productCount: number;
  orderCount: number;
  totalSales: number;
  totalRevenue: number;
  dailySales: DailySale[];
}
const AnalyticsState: AnalyticsProps = {
  // Add any additional props needed here
  userCount: 0,
  productCount: 0,
  orderCount: 0,
  totalSales: 0,
  totalRevenue: 0,
  dailySales: [],
};

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsProps>(AnalyticsState);
  const analyticsData: AnalyticsData[] = [
    {
      id: 1,
      name: "total Users",
      count: analytics.userCount,
      icon: <User size={150} />,
    },
    {
      id: 2,
      name: "total Products",
      count: analytics.productCount,
      icon: <Cuboid size={150} />,
    },
    {
      id: 3,
      name: "total Sales",
      count: analytics.totalSales,
      icon: <ShoppingCart size={150} />,
    },
    {
      id: 4,
      name: "total Revenue",
      count: `$ ${analytics.totalRevenue}`,
      icon: <DollarSign size={150} />,
    },
  ];

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const res = await axios.get("/analytics");

        setAnalytics(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAnalytics();
  }, []);

  console.log(analytics);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-6 ">
        {analyticsData.map((item) => (
          <div
            key={item.id}
            className="shadow bg-base-200 text-primary flex items-center justify-between overflow-hidden rounded-lg "
          >
            <div className="px-4">
              <p className=" font-bold text-secondary">{item.name}</p>
              <span className="text-primary font-bold">{item.count}</span>
            </div>
            <div className="relative -right-12">
              <p className="text-secondary/40">{item.icon}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="my-10 shadow-xl bg-base-300 rounded-md lg:p-5 p-2">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={analytics.dailySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1d1d1" />
            <YAxis yAxisId="left" stroke="#d1d1d1" />
            <YAxis yAxisId="right" orientation="right" stroke="#d1d1d1" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalRevenue"
              stroke="#82ca9d" // Different color for revenue
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Analytics;
