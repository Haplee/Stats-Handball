// src/components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <div className="text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
