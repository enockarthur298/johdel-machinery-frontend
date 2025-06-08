import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Info, Truck, RotateCcw, Shield } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCarousel from '../components/common/ProductCarousel';
import Rating from '../components/common/Rating';
import QuantitySelector from '../components/common/QuantitySelector';
import ProductGrid from '../components/common/ProductGrid';
import Toast from '../components/common/Toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(mockProducts.find(p => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as const });
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Similar products (same category, different product)
  const similarProducts = mockProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  useEffect(() => {
    // Find the product based on ID
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct);
    
    // Reset quantity when product changes
    setQuantity(1);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    addToCart(product, quantity);
    setToast({
      show: true,
      message: `${product.name} added to your cart!`,
      type: 'success'
    });
  };
  
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    addToCart(product, quantity);
    // Navigate to checkout
    window.location.href = '/checkout';
  };
  
  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="py-8">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/category/${product.category}`} className="hover:text-primary-600 capitalize">
            {product.category}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product images */}
            <div>
              <ProductCarousel images={product.images} alt={product.name} />
            </div>
            
            {/* Product details */}
            <div>
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-600 mr-4">Brand: {product.brand}</span>
                  <Rating value={product.rating} count={product.reviewCount} />
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ₵{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                
                {/* Availability */}
                <div className="mb-6">
                  {product.inStock ? (
                    <div className="flex items-center text-green-600">
                      <span className="inline-block w-3 h-3 bg-green-600 rounded-full mr-2"></span>
                      <span className="font-medium">In Stock</span>
                      {product.stockCount && product.stockCount < 10 && (
                        <span className="ml-2 text-sm text-gray-600">
                          (Only {product.stockCount} left)
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                      <span className="font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                {/* Key features */}
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">Key Features:</h2>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {product.features?.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Add to cart section */}
                {product.inStock && (
                  <div className="mb-8 space-y-4">
                    <div className="flex items-center">
                      <span className="mr-4 font-medium">Quantity:</span>
                      <QuantitySelector 
                        quantity={quantity} 
                        onChange={setQuantity} 
                        max={product.stockCount || 99}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary flex-1 py-3"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-secondary flex-1 py-3"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </motion.button>
                    </div>
                    

                  </div>
                )}
                
                {/* Delivery info */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="flex items-start">
                    <Truck size={20} className="text-gray-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Delivery</h3>
                      <p className="text-sm text-gray-600">Free delivery on orders over ₵5,000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <RotateCcw size={20} className="text-gray-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Returns</h3>
                      <p className="text-sm text-gray-600">30-day easy returns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield size={20} className="text-gray-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Warranty</h3>
                      <p className="text-sm text-gray-600">
                        {product.specifications?.Warranty || '1 Year Manufacturer Warranty'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for additional information */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handleTabChange('description')}
              >
                Description
              </button>
              
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'specifications'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handleTabChange('specifications')}
              >
                Specifications
              </button>
              
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handleTabChange('reviews')}
              >
                Reviews ({product.reviewCount})
              </button>
              
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'shipping'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handleTabChange('shipping')}
              >
                Shipping & Returns
              </button>
            </div>
            
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Product Description</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    
                    <h3 className="text-lg font-medium mb-2">Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                      {product.features?.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-medium mb-2">What's in the Box</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>{product.name}</li>
                      <li>User Manual</li>
                      <li>Warranty Card</li>
                      {product.category === 'drills' && (
                        <>
                          <li>Carrying Case</li>
                          <li>Battery Charger</li>
                        </>
                      )}
                    </ul>
                  </motion.div>
                )}
                
                {activeTab === 'specifications' && (
                  <motion.div
                    key="specifications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Technical Specifications</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <tbody>
                          {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                            <tr key={key} className="border-b border-gray-200">
                              <td className="py-3 pr-4 font-medium text-gray-900 w-1/3">{key}</td>
                              <td className="py-3 text-gray-700">{value}</td>
                            </tr>
                          ))}
                          {product.powerType && (
                            <tr className="border-b border-gray-200">
                              <td className="py-3 pr-4 font-medium text-gray-900 w-1/3">Power Type</td>
                              <td className="py-3 text-gray-700 capitalize">{product.powerType}</td>
                            </tr>
                          )}
                          {product.voltage && (
                            <tr className="border-b border-gray-200">
                              <td className="py-3 pr-4 font-medium text-gray-900 w-1/3">Voltage</td>
                              <td className="py-3 text-gray-700">{product.voltage}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Customer Reviews</h2>
                      <button className="btn-outline">Write a Review</button>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-center mb-2">
                        <Rating value={product.rating} />
                        <span className="ml-2 text-lg font-medium">
                          {product.rating} out of 5
                        </span>
                      </div>
                      <p className="text-gray-600">Based on {product.reviewCount} reviews</p>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Mock reviews */}
                      <div className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-medium">John D.</h3>
                            <div className="flex items-center">
                              <Rating value={5} showCount={false} size={14} />
                              <span className="ml-2 text-sm text-gray-500">2 months ago</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">Verified Purchase</div>
                        </div>
                        <h4 className="font-medium mb-2">Excellent quality and performance</h4>
                        <p className="text-gray-700">
                          This {product.name} exceeded my expectations. It's powerful, well-built, and 
                          the battery life is impressive. I've used it on several projects and it handled 
                          everything with ease.
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-medium">Sarah M.</h3>
                            <div className="flex items-center">
                              <Rating value={4} showCount={false} size={14} />
                              <span className="ml-2 text-sm text-gray-500">1 month ago</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">Verified Purchase</div>
                        </div>
                        <h4 className="font-medium mb-2">Great value for money</h4>
                        <p className="text-gray-700">
                          I'm very happy with this purchase. The quality is excellent for the price 
                          point. My only small complaint is that the carrying case could be a bit 
                          sturdier, but the tool itself is fantastic.
                        </p>
                      </div>
                      
                      <button className="text-primary-600 font-medium hover:text-primary-800">
                        Load More Reviews
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Shipping & Returns</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Free standard shipping on orders over ₵5,000</li>
                        <li>Standard delivery: 3-5 business days</li>
                        <li>Express delivery: 1-2 business days (additional fees apply)</li>
                        <li>We ship to all major cities in Ghana</li>
                        <li>For bulky items, our delivery team will contact you to arrange a convenient delivery time</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Return or exchange items within 30 days of delivery</li>
                        <li>Items must be unused, in original packaging with all accessories and documentation</li>
                        <li>Defective products can be returned for replacement or refund</li>
                        <li>Contact our customer service team to initiate a return</li>
                        <li>Refunds will be processed within 7-10 business days after receiving the returned item</li>
                      </ul>
                      
                      <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                        <div className="flex items-start">
                          <Info size={20} className="text-primary-600 mr-3 mt-0.5" />
                          <p className="text-sm text-gray-700">
                            For specialized or custom orders, different shipping and return policies may apply. 
                            Please contact our customer service team for more information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar products */}
      <section className="py-12">
        <ProductGrid products={similarProducts} title="You Might Also Like" />
      </section>
      
      {/* Toast notification */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={closeToast}
      />
      
      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Login Required</h2>
                <p className="text-gray-600 mb-6">
                  Please login to add items to your cart or make a purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login" className="btn-primary flex-1 text-center">
                    Login
                  </Link>
                  <button 
                    className="btn-outline flex-1"
                    onClick={() => setShowLoginModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;