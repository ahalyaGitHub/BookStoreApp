import React, { useEffect, useState } from "react";

export default function AdminSellerDetails() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      const response = await fetch("http://localhost:5000/seller/");
      const data = await response.json();
      setSellers(data.sellers); // Assuming the response contains an array of sellers
    } catch (error) {
      console.error("Error fetching seller data:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Seller Details</h1>

      {/* Seller Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Seller ID</th>
              <th className="px-6 py-3 text-left">Store Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Registration Date</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id} className="border-t">
                <td className="px-6 py-3">{seller._id}</td>
                <td className="px-6 py-3">{seller.storeName}</td>
                <td className="px-6 py-3">{seller.email}</td>
                <td className="px-6 py-3">{new Date(seller.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3">{seller.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
