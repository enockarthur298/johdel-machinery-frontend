import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  images: string[];
  alt: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Handle previous image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // Handle next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Variant for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };
  
  // Direction of slide animation
  const [[direction], setDirection] = useState([0]);
  
  // Change image with direction tracking
  const changeImage = (newIndex: number) => {
    const newDirection = newIndex > currentIndex ? 1 : -1;
    setDirection([newDirection]);
    setCurrentIndex(newIndex);
  };
  
  return (
    <div className="relative rounded-lg overflow-hidden bg-white">
      {/* Main image */}
      <div className="aspect-square overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} - image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-60 hover:bg-opacity-100 shadow-md z-10"
              onClick={handlePrevious}
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-60 hover:bg-opacity-100 shadow-md z-10"
              onClick={handleNext}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex mt-4 gap-2 px-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-1 aspect-square overflow-hidden rounded border-2 transition-all ${
                index === currentIndex ? 'border-primary-500' : 'border-transparent'
              }`}
              onClick={() => changeImage(index)}
            >
              <img
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;