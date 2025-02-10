import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";

export default function AdminProductDetails() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch("https://bookstoreapp-vftf.onrender.com/product/");
      const data = await response.json();
      console.log(data);

      // Fetch seller data based on sellerId
      const sellerPromises = data.products.map((product) =>
        fetch(`https://bookstoreapp-vftf.onrender.com/seller/${product.sellerId}`)
          .then((res) => res.json())
          .then((sellerData) => ({
            ...product,
            sellerName: sellerData.name,
          }))
      );
      const productsWithSellerData = await Promise.all(sellerPromises);

      setProducts(productsWithSellerData); // Assuming the response contains an array of products
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Details</h1>
        <p className="text-gray-600">No books found.</p>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Details</h1>

        {/* Product Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Book ID</th>
                <th className="px-6 py-3 text-left">Book Name</th>
                <th className="px-6 py-3 text-left">Book Price</th>
                <th className="px-6 py-3 text-left">Book Genre</th>
                <th className="px-6 py-3 text-left">Book Author</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Seller ID</th>
                <th className="px-6 py-3 text-left">Seller Name</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-6 py-3">{product._id}</td>
                  <td className="px-6 py-3">{product.name}</td>
                  <td className="px-6 py-3">₹{product.price}</td>
                  <td className="px-6 py-3">{product.genre}</td>
                  <td className="px-6 py-3">{product.author}</td>
                  <td className="px-6 py-3">{product.description}</td>
                  <td className="px-6 py-3">{product.sellerId}</td>
                  <td className="px-6 py-3">{product.sellerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
