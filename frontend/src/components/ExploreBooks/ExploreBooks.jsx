import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExploreBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    useEffect(() => {
        // Fetch all products (books) from the backend
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product/');
                console.log(response.data.products);
                setBooks(response.data.products);
                setLoading(false);
            } catch (err) {
                setError('Failed to load books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const addToCart = async (bookId) => {
        try {
            const response = await axios.post('http://localhost:5000/order/add-to-cart', { userId, productId: bookId });
            toast.success(response.data.message); // Show success message
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // If the product is already in the cart
                toast.error(error.response.data.message);
            } else {
                // Handle other errors
                toast.error('Failed to add to cart');
            }
        }
    };
    

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <ToastContainer />
            <nav className="bg-gray-800 text-white">
                <div className="container mx-auto flex justify-between items-center p-6">
                    {/* Bookstore Name */}
                    <div className="text-2xl font-bold">
                        <Link to="/">BOOK STORE</Link>
                    </div>

                    <Link
                        to="/cart"
                        className="px-4 py-2 text-white font-bold hover:bg-white hover:text-black ms-auto"
                    >
                        View Cart
                    </Link>

                    {/* Hamburger Icon */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Nav Items */}
                    <div
                        className={`md:flex items-center space-x-6 ${isOpen ? "block" : "hidden"
                            } md:block`}
                    >
                    </div>
                </div>
            </nav>



            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Explore Books</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {books.map((book) => (
                        <div key={book._id} className="border p-4 shadow-lg">
                            <img
                                src={book.imageUrl ? book.imageUrl : 'Image Loading'}
                                alt={book.name}
                                className="w-full h-60 object-cover mb-4 rounded-md"
                            />
                            <h2 className="text-xl font-semibold">{book.name}</h2>
                            <p className="text-sm text-gray-600">by {book.author}</p>
                            <p className="text-sm text-gray-500">{book.genre}</p>
                            <p className="text-sm text-gray-700 mt-2">{book.description}</p>
                            <p className="mt-4 font-semibold text-lg">₹{book.price}</p>
                            <button
                                onClick={() => addToCart(book._id)}
                                className="mt-4 bg-gray-800 text-white py-2 px-4"
                            >
                                Add to Cart
                            </button>
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default ExploreBooks;
