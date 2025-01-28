import React, { useEffect, useState } from "react";
import Nav from '../Navbar/Nav';

export default function AdminUserDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/");
      const data = await response.json();
      setUsers(data.users); // Assuming the response contains an array of users
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
    <Nav />
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">User Details</h1>
      
      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left">User ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-3">{user._id}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.address}</td>
                <td className="px-6 py-3">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
