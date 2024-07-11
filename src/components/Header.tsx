import React from 'react';
import Link from 'next/link';

const Header = () => (
    <header className="bg-gradient-to-r from-pink-100 to-blue-100 p-4 flex justify-between items-center">
        <nav className="flex space-x-4">
            <Link href="#" className="text-gray-800">Home</Link>
            <Link href="#" className="text-gray-800">About us</Link>
            <Link href="#" className="text-gray-800">My meetings</Link>
        </nav>
        <div className="space-x-4">
            <button className="border border-purple-500 text-purple-500 px-4 py-2 rounded">Log In</button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded">Sign Up</button>
        </div>
    </header>
);

export default Header;
