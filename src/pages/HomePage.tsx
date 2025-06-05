import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { categories, mockProducts } from '../data/mockData';
import ProductGrid from '../components/common/ProductGrid';
import CategoryTile from '../components/common/CategoryTile';

const HomePage: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 4);
  const newArrivals = [...mockProducts].reverse().slice(0, 4);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Professional Tools for Every Project
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-primary-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Quality machinery, competitive prices, and expert advice for contractors, 
              DIY enthusiasts, and industrial applications.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/category/drills" className="btn-secondary">
                Shop Now
              </Link>
              <Link to="/deals" className="btn border border-white text-white hover:bg-white hover:text-primary-700 px-4 py-2">
                View Special Deals
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute right-0 top-0 h-full text-primary-800 opacity-20" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 100,100" />
          </svg>
          <svg className="absolute left-0 bottom-0 h-full text-primary-800 opacity-20 transform rotate-180" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 100,100" />
          </svg>
        </div>
      </section>
      
      {/* Search section */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <form className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for drills, saws, accessories..."
              className="input pr-12 w-full py-3"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-primary-600 hover:text-primary-800"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>
      
      {/* Category tiles */}
      <motion.section 
        className="py-12 bg-gray-50"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map(category => (
              <CategoryTile 
                key={category.id} 
                id={category.id} 
                name={category.name} 
                icon={category.icon} 
              />
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Featured products section */}
      <motion.section 
        className="py-12"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ProductGrid products={featuredProducts} title="Featured Products" />
        <div className="text-center mt-8">
          <Link to="/category/all" className="btn-primary">
            View All Products
          </Link>
        </div>
      </motion.section>
      
      {/* Promotional banner */}
      <section className="bg-secondary-500 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Summer Sale: Up to 20% off on Power Drills!</h2>
            <p className="text-lg mb-6">
              Upgrade your workshop with our premium selection of power drills. 
              Limited time offer, while supplies last.
            </p>
            <Link to="/deals" className="btn bg-white text-secondary-600 hover:bg-gray-100 px-6 py-3 font-medium">
              Shop Deals
            </Link>
          </div>
        </div>
      </section>
      
      {/* New arrivals section */}
      <motion.section 
        className="py-12"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ProductGrid products={newArrivals} title="New Arrivals" />
      </motion.section>
      
      {/* Trust badges */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">We source only the best tools from trusted manufacturers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery to your workshop or construction site</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Secure Payments</h3>
              <p className="text-gray-600">Multiple secure payment options for your convenience</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">Hassle-free return process within 30 days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;