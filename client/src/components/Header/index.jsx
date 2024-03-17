import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <nav className="navbar bg-aggressive-gradient shadow-lg">
        <ul className="flex justify-between items-center w-full text-white py-4 px-6 text-lg">
          <li className="hover:text-lightGreen transition-colors duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-lightGreen transition-colors duration-300">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-lightGreen transition-colors duration-300">
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
