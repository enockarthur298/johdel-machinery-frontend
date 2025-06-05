import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
  min?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity,
  onChange,
  max = 99,
  min = 1
}) => {
  const decrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };
  
  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < min) {
        onChange(min);
      } else if (value > max) {
        onChange(max);
      } else {
        onChange(value);
      }
    }
  };
  
  return (
    <div className="flex items-center">
      <motion.button
        type="button"
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600"
        onClick={decrease}
        whileTap={{ scale: 0.95 }}
        disabled={quantity <= min}
      >
        <Minus size={16} />
      </motion.button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-12 h-8 border-t border-b border-gray-300 text-center text-gray-900 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      />
      
      <motion.button
        type="button"
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-600"
        onClick={increase}
        whileTap={{ scale: 0.95 }}
        disabled={quantity >= max}
      >
        <Plus size={16} />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;