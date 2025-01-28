import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { jwtDecode } from "jwt-decode";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function SellerDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Fetch product and order data for this seller
    fetchProductData();
    fetchOrderData();
  }, []);

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const sellerId = decoded.id;

  const fetchProductData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/product/count/${sellerId}`);
      const data = await response.json();
      setProductCount(data.productCount);

      // For the product chart, use total product count
      setProductData([data.productCount]); // Just use the total count for the product chart
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/order/count/${sellerId}`);
      const data = await response.json();
      setOrderCount(data.orderCount);

      setOrderData([
        data.orderedOrders, // Ordered orders count
        data.cancelledOrders, // Cancelled orders count
      ]);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  // Chart.js configuration for graphical representation
  const productChartData = {
    labels: ["Total Products"], 
    datasets: [
      {
        label: "Products",
        data: productData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const orderChartData = {
    labels: ["Ordered Books", "Cancelled Books"], 
    datasets: [
      {
        label: "Orders",
        data: orderData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between space-x-6">
        {/* Product Details Box */}
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Details</h2>
          <p className="text-gray-600 mb-4">You have uploaded {productCount} products.</p>
          <Link
            to="/sellerBookList" // Redirects to product page
            className="inline-block px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
          >
            View Your Products
          </Link>
        </div>

        {/* Orders Box */}
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h2>
          <p className="text-gray-600 mb-4">You have {orderCount} orders.</p>
          <Link
            to="/sellerOrderList" // Redirects to order page
            className="inline-block px-6 py-3 bg-green-600 text-white hover:bg-green-700"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Graphical Representation

      <div className="flex justify-between space-x-6">
        
        Product Chart 
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Distribution</h3>
          <Bar data={productChartData} />
        </div>

        Order Chart 
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Status</h3>
          <Bar data={orderChartData} />
        </div>
      </div> */}
      
    </div>
  );
}
