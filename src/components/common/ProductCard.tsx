import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <motion.div 
      className="product-card group"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-md font-medium">
                Out of Stock
              </span>
            </div>
          )}
          
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-secondary-500"
              onClick={(e) => e.preventDefault()}
            >
              <Heart size={18} />
            </motion.button>
            
            {product.inStock && (
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-primary-600"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
              </motion.button>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-1">
            <span className="text-sm font-medium text-gray-600">{product.brand}</span>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400 mr-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  stroke={i < Math.floor(product.rating) ? "none" : "currentColor"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ₵{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            
            {product.inStock ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;