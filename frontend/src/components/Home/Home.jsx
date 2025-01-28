import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode} from "jwt-decode"; // Corrected import
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import SellerDashboard from "../SellerDashboard/SellerDashboard";

export default function Home() {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { id, role } = decoded;

        setRole(role);

        if (role !== "admin") {
          fetch(`http://localhost:5000/${role}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch user data");
              }
              return response.json();
            })
            .then((data) => {
              setUsername(data.name || "Unknown User");
            })
            .catch((error) =>
              console.error("Error fetching user data:", error)
            );
        } else {
          setUsername("Admin");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    setRole(null);
    navigate("/");
  };

  const handleExploreMoreClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/books');
    } else {
      navigate('/login');
    }
  }

  return (
    <>
      {/* Navbar (always rendered) */}
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto flex justify-between items-center p-6">
          {/* Bookstore Name */} 
          <div className="text-2xl font-bold">
            <Link to="/">BOOK STORE</Link>
          </div>

          {/* Nav Items */} 
          <div className="flex items-center space-x-6">
            {username ? (
              <>
                <span className="font-bold">
                  Logged in as {role === "admin" ? "Admin" : username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white rounded-full text-black font-bold hover:bg-black hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="px-4 py-2 bg-white rounded-full text-black font-bold hover:bg-black hover:text-white"
              >
                Login 
              </Link> 
            )}
          </div>
        </div>
      </nav>

      {/* Conditionally render the appropriate dashboard */} 
      {role === "admin" ? (
        <AdminDashboard />
      ) : role === "seller" ? (
        <SellerDashboard />
      ) : (
        <>
          {/* Home Page Content for Users */}
          <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to the Book Store!
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Discover a world of knowledge and adventure in our vast
                collection of books.
              </p>
              <Link
                to="/books"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700"
                onClick={handleExploreMoreClick}
              >
                Explore Books
              </Link>
            </div>
            <div className="mt-10">
              <img
                src="https://img.freepik.com/free-vector/book-store-concept-illustration_114360-7954.jpg"
                alt="Bookstore"
                className="w-2/3 mx-auto"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
