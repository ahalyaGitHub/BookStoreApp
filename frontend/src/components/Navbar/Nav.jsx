import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center p-6">
                {/* Bookstore Name */}
                <div className="text-2xl font-bold">
                    <Link to="/">BOOK STORE</Link>
                </div>

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
    )
}
