import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface CategoryTileProps {
  id: string;
  name: string;
  icon: string;
}

const CategoryTile: React.FC<CategoryTileProps> = ({ id, name, icon }) => {
  // Dynamically get the icon from lucide-react
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Package;
  
  return (
    <Link to={`/category/${id}`}>
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="mb-3 p-3 bg-primary-100 text-primary-600 rounded-full">
          <IconComponent size={28} />
        </div>
        <h3 className="font-medium text-gray-900">{name}</h3>
      </motion.div>
    </Link>
  );
};

export default CategoryTile;