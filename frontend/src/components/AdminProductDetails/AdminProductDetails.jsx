import React, { useEffect, useState } from "react";

export default function AdminProductDetails() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/");
      const data = await response.json();
      setProducts(data.products); // Assuming the response contains an array of products
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Product Details</h1>
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Product Details</h1>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Product ID</th>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-6 py-3">{product._id}</td>
                <td className="px-6 py-3">{product.name}</td>
                <td className="px-6 py-3">${product.price}</td>
                <td className="px-6 py-3">{product.category}</td>
                <td className="px-6 py-3">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
