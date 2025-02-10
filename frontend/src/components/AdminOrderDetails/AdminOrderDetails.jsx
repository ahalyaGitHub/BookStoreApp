import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";

export default function AdminOrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await fetch("https://bookstoreapp-vftf.onrender.com/order/");
      const data = await response.json();
      console.log(data);
      setOrders(data.orders); // Assuming the response contains an array of orders
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h1>

        {/* Order Table */}
        <div className="overflow-x-auto bg-white shadow-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Book ID</th>
                <th className="px-6 py-3 text-left">Book Name</th>
                <th className="px-6 py-3 text-left">Customer ID</th>
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Seller ID</th>
                <th className="px-6 py-3 text-left">Seller Name</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Order Date</th>
                <th className="px-6 py-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="px-6 py-3">{order._id}</td>
                    <td className="px-6 py-3">{order.productId?._id}</td> 
                    <td className="px-6 py-3">{order.productId?.name}</td> 
                    <td className="px-6 py-3">{order.userId?._id}</td> 
                    <td className="px-6 py-3">{order.userId?.name}</td> 
                    <td className="px-6 py-3">{order.productId?.sellerId?._id}</td> 
                    <td className="px-6 py-3">{order.productId?.sellerId?.name}</td> 
                    <td className="px-6 py-3">{order.status}</td>
                    <td className="px-6 py-3">{order.orderedDate || "-"}</td>
                    <td className="px-6 py-3">₹{order.productId?.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
