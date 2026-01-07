"use client";

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 flex-wrap">
        <div className="text-xl font-bold">
          <Link href="/">TFG Análisis de Balonmano con IA</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 dark:text-white focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <nav className={`w-full md:flex md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            <li><Link href="/" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/progress" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => setIsMenuOpen(false)}>Progreso</Link></li>
            <li><Link href="/system" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => setIsMenuOpen(false)}>Sistema</Link></li>
            <li><Link href="/results" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => setIsMenuOpen(false)}>Resultados</Link></li>
            <li><Link href="/blog" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            <li><Link href="/tfg" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => setIsMenuOpen(false)}>TFG</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
