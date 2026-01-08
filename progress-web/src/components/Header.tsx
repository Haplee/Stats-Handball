"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/progress', label: 'Progreso' },
    { href: '/system', label: 'Sistema' },
    { href: '/results', label: 'Resultados' },
    { href: '/blog', label: 'Blog' },
    { href: '/tfg', label: 'TFG' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <header className="bg-gray-900 bg-opacity-90 text-white shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold tracking-wider">
          <Link href="/">Stats Handball</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        <nav className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-16 left-0 md:top-0 bg-gray-900 md:bg-transparent p-4 md:p-0`}>
          <ul className="flex flex-col md:flex-row md:space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 ${
                    pathname === link.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
