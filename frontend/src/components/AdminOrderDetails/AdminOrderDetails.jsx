import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";

export default function AdminOrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await fetch("http://localhost:5000/order/");
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
                <th className="px-6 py-3 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => order.status === "Ordered") // Filter the orders based on status
                .map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="px-6 py-3">{order._id}</td>
                    <td className="px-6 py-3">{order.productId}</td> {/* Assuming productId is the book ID */}
                    <td className="px-6 py-3">{order.productId}</td> {/* Add actual book name here */}
                    <td className="px-6 py-3">{order.userId}</td> {/* Assuming userId is the customer ID */}
                    <td className="px-6 py-3">{order.userId}</td> {/* Add actual customer name here */}
                    <td className="px-6 py-3">{order.sellerId}</td> {/* Assuming sellerId is the seller ID */}
                    <td className="px-6 py-3">{order.sellerId}</td> {/* Add actual seller name here */}
                    <td className="px-6 py-3">{order.status}</td>
                    <td className="px-6 py-3">{order.orderedDate}</td>
                    <td className="px-6 py-3">₹{order.totalAmount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
