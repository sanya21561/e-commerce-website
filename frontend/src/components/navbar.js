import React, { useState, useEffect } from 'react';

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex items-center justify-between bg-gray-900 p-4">
      <a href="/" className="text-white text-3xl font-bold">
        ARFISA
      </a>
      <div className="flex space-x-4">
        <a href="/" className="text-white hover:text-gray-400">
          Home
        </a>
        <a href="/products" className="text-white hover:text-gray-400">
          Products
        </a>
        <a href="/categories" className="text-white hover:text-gray-400">
          Category
        </a>
        <a href="/brands" className="text-white hover:text-gray-400">
          Brands
        </a>
        <a href="/cart" className="text-white hover:text-gray-400">
          Cart
        </a>
        {user ? (
          <a href="/profile" className="text-white hover:text-gray-400">{user.fname}</a>
        ) : (
          <>
            <a href="/signup" className="text-white hover:text-gray-400">
              Sign up
            </a>
            <a href="/login" className="text-white hover:text-gray-400">
              Login
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
