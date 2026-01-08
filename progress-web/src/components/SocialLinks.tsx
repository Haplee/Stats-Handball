"use client";

import { motion } from "framer-motion";
import { Globe, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import MotionCard from "./MotionCard";

const socialLinks = [
  {
    name: "Portfolio",
    url: "https://haplee.github.io/Portafolio-FranVi",
    icon: <Globe size={48} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/franvidalmateo",
    icon: <Instagram size={48} />,
  },
  {
    name: "Twitter (X)",
    url: "https://twitter.com/FranVidalMateo",
    icon: <Twitter size={48} />,
  },
];

const SocialLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {socialLinks.map((link, index) => (
        <MotionCard key={link.name} className="bg-gray-800 p-6 rounded-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4">{link.icon}</div>
            <h3 className="text-xl font-bold mb-4">{link.name}</h3>
            <Link href={link.url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Visitar
            </Link>
          </motion.div>
        </MotionCard>
      ))}
    </div>
  );
};

export default SocialLinks;
