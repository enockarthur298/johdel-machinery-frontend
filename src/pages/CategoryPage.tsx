import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Filter, ChevronDown, ChevronUp, ChevronRight, X, Check, 
  Star, Sliders, Grid, List 
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import ProductGrid from '../components/common/ProductGrid';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    brand: [],
    powerType: [],
    priceRange: [],
    rating: []
  });
  const [sortOption, setSortOption] = useState('relevance');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Get all available brands from products
  const brands = Array.from(new Set(mockProducts.map(p => p.brand)));
  
  // Get all available power types from products
  const powerTypes = Array.from(new Set(mockProducts
    .filter(p => p.powerType)
    .map(p => p.powerType as string)));
  
  // Price ranges
  const priceRanges = [
    { id: 'under500', label: 'Under ₵500', min: 0, max: 500 },
    { id: '500to1000', label: '₵500 - ₵1,000', min: 500, max: 1000 },
    { id: '1000to2000', label: '₵1,000 - ₵2,000', min: 1000, max: 2000 },
    { id: 'over2000', label: 'Over ₵2,000', min: 2000, max: Infinity }
  ];
  
  // Rating filters
  const ratingFilters = [
    { id: '4stars', label: '4★ & Above', value: 4 },
    { id: '3stars', label: '3★ & Above', value: 3 },
    { id: '2stars', label: '2★ & Above', value: 2 }
  ];
  
  // Get products by category
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredByCategory;
      
      if (categoryId === 'all') {
        filteredByCategory = [...mockProducts];
      } else {
        filteredByCategory = mockProducts.filter(p => p.category === categoryId);
      }
      
      setProducts(filteredByCategory);
      setFilteredProducts(filteredByCategory);
      setIsLoading(false);
    }, 800);
  }, [categoryId]);
  
  // Apply filters and sorting
  useEffect(() => {
    // Start with all products for the category
    let result = [...products];
    
    // Apply brand filter
    if (activeFilters.brand.length > 0) {
      result = result.filter(product => 
        activeFilters.brand.includes(product.brand)
      );
    }
    
    // Apply power type filter
    if (activeFilters.powerType.length > 0) {
      result = result.filter(product => 
        product.powerType && activeFilters.powerType.includes(product.powerType)
      );
    }
    
    // Apply price range filter
    if (activeFilters.priceRange.length > 0) {
      result = result.filter(product => {
        return activeFilters.priceRange.some(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          if (range) {
            return product.price >= range.min && product.price <= range.max;
          }
          return false;
        });
      });
    }
    
    // Apply rating filter
    if (activeFilters.rating.length > 0) {
      const minRating = Math.min(
        ...activeFilters.rating.map(ratingId => {
          const rating = ratingFilters.find(r => r.id === ratingId);
          return rating ? rating.value : 0;
        })
      );
      result = result.filter(product => product.rating >= minRating);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, this would use a date field
        // For mock data, we'll just use the id in reverse
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'relevance':
      default:
        // Default sorting is by relevance (we'll use id for mock data)
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
    }
    
    setFilteredProducts(result);
  }, [products, activeFilters, sortOption]);
  
  const toggleFilter = (filterType: string, value: string) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterType] || [];
      
      // If value is already selected, remove it
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterType]: currentValues.filter(v => v !== value)
        };
      }
      
      // Otherwise, add it
      return {
        ...prev,
        [filterType]: [...currentValues, value]
      };
    });
  };
  
  const clearFilters = () => {
    setActiveFilters({
      brand: [],
      powerType: [],
      priceRange: [],
      rating: []
    });
  };
  
  const getCategoryName = () => {
    if (categoryId === 'all') return 'All Products';
    return categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : '';
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/category/all" className="hover:text-primary-600">
            Shop
          </Link>
          {categoryId !== 'all' && (
            <>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-gray-900 font-medium capitalize">{categoryId}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {getCategoryName()}
        </h1>
        <p className="text-gray-600 mt-2">
          {filteredProducts.length} products
        </p>
      </div>
      
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          className="w-full btn-outline flex items-center justify-center"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Filter size={18} className="mr-2" />
          Filter & Sort
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - Desktop */}
        <motion.div 
          className="hidden md:block w-64 flex-shrink-0"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              {Object.values(activeFilters).some(arr => arr.length > 0) && (
                <button
                  className="text-sm text-primary-600 hover:text-primary-800"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* Filter sections */}
            <div className="space-y-6">
              {/* Brand filter */}
              <div>
                <button
                  className="flex justify-between items-center w-full text-left font-medium mb-2"
                  onClick={() => setShowFilters(prev => !prev)}
                >
                  Brand
                  {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {showFilters && (
                  <div className="space-y-2 mt-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={activeFilters.brand.includes(brand)}
                          onChange={() => toggleFilter('brand', brand)}
                        />
                        <span className="ml-2 text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Power Type filter */}
              <div>
                <button
                  className="flex justify-between items-center w-full text-left font-medium mb-2"
                  onClick={() => setShowFilters(prev => !prev)}
                >
                  Power Type
                  {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {showFilters && (
                  <div className="space-y-2 mt-2">
                    {powerTypes.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={activeFilters.powerType.includes(type)}
                          onChange={() => toggleFilter('powerType', type)}
                        />
                        <span className="ml-2 text-gray-700 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Price Range filter */}
              <div>
                <button
                  className="flex justify-between items-center w-full text-left font-medium mb-2"
                  onClick={() => setShowFilters(prev => !prev)}
                >
                  Price Range
                  {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {showFilters && (
                  <div className="space-y-2 mt-2">
                    {priceRanges.map(range => (
                      <label key={range.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={activeFilters.priceRange.includes(range.id)}
                          onChange={() => toggleFilter('priceRange', range.id)}
                        />
                        <span className="ml-2 text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Rating filter */}
              <div>
                <button
                  className="flex justify-between items-center w-full text-left font-medium mb-2"
                  onClick={() => setShowFilters(prev => !prev)}
                >
                  Customer Rating
                  {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {showFilters && (
                  <div className="space-y-2 mt-2">
                    {ratingFilters.map(filter => (
                      <label key={filter.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={activeFilters.rating.includes(filter.id)}
                          onChange={() => toggleFilter('rating', filter.id)}
                        />
                        <span className="ml-2 flex items-center">
                          {filter.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Products section */}
        <div className="flex-1">
          {/* Sort and view options */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6 flex justify-between">
            <div className="flex items-center">
              <label className="text-gray-700 mr-2 hidden md:inline">Sort by:</label>
              <select
                className="input max-w-xs text-sm py-1"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md bg-primary-50 text-primary-600">
                <Grid size={18} />
              </button>
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-700">
                <List size={18} />
              </button>
            </div>
          </div>
          
          {/* Active filters */}
          {Object.values(activeFilters).some(arr => arr.length > 0) && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {activeFilters.brand.length > 0 && activeFilters.brand.map(brand => (
                  <div key={brand} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span className="text-sm">{brand}</span>
                    <button 
                      className="ml-2 text-gray-500 hover:text-gray-800"
                      onClick={() => toggleFilter('brand', brand)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {activeFilters.powerType.length > 0 && activeFilters.powerType.map(type => (
                  <div key={type} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span className="text-sm capitalize">{type}</span>
                    <button 
                      className="ml-2 text-gray-500 hover:text-gray-800"
                      onClick={() => toggleFilter('powerType', type)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {activeFilters.priceRange.length > 0 && activeFilters.priceRange.map(rangeId => {
                  const range = priceRanges.find(r => r.id === rangeId);
                  return range ? (
                    <div key={rangeId} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm">{range.label}</span>
                      <button 
                        className="ml-2 text-gray-500 hover:text-gray-800"
                        onClick={() => toggleFilter('priceRange', rangeId)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : null;
                })}
                
                {activeFilters.rating.length > 0 && activeFilters.rating.map(ratingId => {
                  const rating = ratingFilters.find(r => r.id === ratingId);
                  return rating ? (
                    <div key={ratingId} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm">{rating.label}</span>
                      <button 
                        className="ml-2 text-gray-500 hover:text-gray-800"
                        onClick={() => toggleFilter('rating', ratingId)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : null;
                })}
                
                <button
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
          
          {/* Product grid */}
          {filteredProducts.length === 0 && !isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or browse all products.
              </p>
              <button 
                className="btn-primary"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Skeleton loaders
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
                    <div className="w-full h-48 bg-gray-300"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                ))
              ) : (
                filteredProducts.map(product => (
                  <motion.div 
                    key={product.id}
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
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile filter modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <motion.div 
            className="absolute right-0 top-0 h-full w-full max-w-xs bg-white overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Filter & Sort</h2>
                <button 
                  className="text-gray-500"
                  onClick={() => setIsFilterModalOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium mb-2">Sort By</h3>
              <div className="space-y-2 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={sortOption === 'relevance'}
                    onChange={() => setSortOption('relevance')}
                  />
                  <span className="ml-2 text-gray-700">Relevance</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={sortOption === 'price-low-high'}
                    onChange={() => setSortOption('price-low-high')}
                  />
                  <span className="ml-2 text-gray-700">Price: Low to High</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={sortOption === 'price-high-low'}
                    onChange={() => setSortOption('price-high-low')}
                  />
                  <span className="ml-2 text-gray-700">Price: High to Low</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={sortOption === 'rating'}
                    onChange={() => setSortOption('rating')}
                  />
                  <span className="ml-2 text-gray-700">Top Rated</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={sortOption === 'newest'}
                    onChange={() => setSortOption('newest')}
                  />
                  <span className="ml-2 text-gray-700">Newest Arrivals</span>
                </label>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="font-medium mb-2">Brand</h3>
                <div className="space-y-2 mb-6">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={activeFilters.brand.includes(brand)}
                        onChange={() => toggleFilter('brand', brand)}
                      />
                      <span className="ml-2 text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="font-medium mb-2">Power Type</h3>
                <div className="space-y-2 mb-6">
                  {powerTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={activeFilters.powerType.includes(type)}
                        onChange={() => toggleFilter('powerType', type)}
                      />
                      <span className="ml-2 text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-2 mb-6">
                  {priceRanges.map(range => (
                    <label key={range.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={activeFilters.priceRange.includes(range.id)}
                        onChange={() => toggleFilter('priceRange', range.id)}
                      />
                      <span className="ml-2 text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="font-medium mb-2">Customer Rating</h3>
                <div className="space-y-2 mb-6">
                  {ratingFilters.map(filter => (
                    <label key={filter.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={activeFilters.rating.includes(filter.id)}
                        onChange={() => toggleFilter('rating', filter.id)}
                      />
                      <span className="ml-2 text-gray-700">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 space-y-3">
                {Object.values(activeFilters).some(arr => arr.length > 0) && (
                  <button
                    className="w-full btn-outline"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                )}
                <button
                  className="w-full btn-primary"
                  onClick={() => setIsFilterModalOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;