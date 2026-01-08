"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/progress', label: 'Progreso' },
    { href: '/results', label: 'Resultados' },
    { href: '/system', label: 'Sistema' },
    { href: '/blog', label: 'Blog' },
    { href: '/tfg', label: 'TFG' },
    { href: '/contact', label: 'Contacto' },
  ];

  const mobileMenuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      }
    },
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <>
      <header className="bg-black/80 backdrop-blur-sm text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/" className="text-2xl font-bold tracking-wider">
              Handball Stats
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors duration-300 ${
                      pathname === link.href ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-blue-400"
                        layoutId="underline"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white z-[60] relative"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.ul
              className="flex flex-col items-center space-y-8 text-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={menuItemVariants}>
                  <Link
                    href={link.href}
                    className={`text-3xl font-semibold transition-colors duration-300 ${
                      pathname === link.href ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
