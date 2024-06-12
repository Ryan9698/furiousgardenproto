"use client";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        onClick={toggleMenu}
        className="block md:hidden"
        aria-label="Toggle Menu"
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
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="md:hidden flex flex-col bg-green-500 rounded p-4">
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/bio" onClick={toggleMenu}>
            Bio
          </Link>
          <Link href="/store" onClick={toggleMenu}>
            Store
          </Link>
          <Link href="/events" onClick={toggleMenu}>
            Events
          </Link>
          <Link href="/contact" onClick={toggleMenu}>
            Contact
          </Link>
        </div>
      )}
    </>
  );
}
