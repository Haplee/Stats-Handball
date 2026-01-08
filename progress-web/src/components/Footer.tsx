"use client";

import { motion } from "framer-motion";
import { Globe, Instagram, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "Portfolio",
    url: "https://haplee.github.io/Portafolio-FranVi",
    icon: <Globe size={24} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/franvidalmateo",
    icon: <Instagram size={24} />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/FranVidalMateo",
    icon: <Twitter size={24} />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} Fran Vidal Mateo</p>
        <p className="text-sm mt-2">
          Proyecto Fin de Grado (TFG) - ASIR
        </p>
      </div>
    </footer>
  );
};

export default Footer;
