import React, { useEffect, useState } from "react";

export default function AdminOrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await fetch("http://localhost:5000/order/");
      const data = await response.json();
      setOrders(data.orders); // Assuming the response contains an array of orders
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Order Details</h1>

      {/* Order Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Order Date</th>
              <th className="px-6 py-3 text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-6 py-3">{order._id}</td>
                <td className="px-6 py-3">{order.userName}</td>
                <td className="px-6 py-3">{order.status}</td>
                <td className="px-6 py-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">${order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
