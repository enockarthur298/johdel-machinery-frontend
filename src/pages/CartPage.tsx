import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import QuantitySelector from '../components/common/QuantitySelector';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Constants for shipping calculation
  const SHIPPING_THRESHOLD = 5000;
  const STANDARD_SHIPPING = 50;
  
  // Calculate shipping cost
  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  
  // Calculate total
  const total = subtotal + shippingCost;
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock coupon validation
    if (couponCode.toLowerCase() === 'welcome10') {
      // Apply discount logic (would normally be handled by backend)
      setCouponError('');
      alert('Coupon applied successfully!');
    } else {
      setCouponError('Invalid coupon code');
    }
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    navigate('/checkout');
  };
  
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.2 }
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <ShoppingCart size={64} className="mx-auto text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
            {isAuthenticated && (
              <Link to="/profile/orders" className="btn-outline">
                View Past Orders
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500">
              <div className="md:col-span-6">Product</div>
              <div className="md:col-span-2 text-center">Price</div>
              <div className="md:col-span-2 text-center">Quantity</div>
              <div className="md:col-span-2 text-right">Total</div>
            </div>
            
            {/* Items */}
            <div className="divide-y divide-gray-200">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div 
                    key={item.product.id}
                    className="px-6 py-4 md:grid md:grid-cols-12 md:gap-6 md:items-center"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Product */}
                    <div className="md:col-span-6 flex items-center">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link to={`/product/${item.product.id}`} className="hover:text-primary-600">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Brand: {item.product.brand}</p>
                        <button
                          type="button"
                          className="mt-1 text-sm font-medium text-primary-600 hover:text-primary-500 md:hidden flex items-center"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 mt-4 md:mt-0 text-sm text-gray-900 md:text-center">
                      <span className="md:hidden">Price: </span>
                      ₵{item.product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 mt-4 md:mt-0 flex items-center md:justify-center">
                      <span className="md:hidden mr-2">Qty: </span>
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(quantity) => updateQuantity(item.product.id, quantity)}
                        max={item.product.stockCount || 99}
                      />
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 mt-4 md:mt-0 flex items-center justify-between md:justify-end">
                      <span className="font-medium text-gray-900">
                        <span className="md:hidden">Total: </span>
                        ₵{(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 md:ml-4 hidden md:block"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Cart actions */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button 
                className="text-primary-600 hover:text-primary-800 flex items-center"
                onClick={() => clearCart()}
              >
                <Trash2 size={16} className="mr-1" />
                Clear Cart
              </button>
              <Link to="/" className="text-primary-600 hover:text-primary-800">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 sticky top-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Order Summary</h2>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₵{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 
                    ? 'Free' 
                    : `₵${shippingCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  }
                </span>
              </div>
              
              {shippingCost > 0 && (
                <div className="text-xs text-gray-500 italic">
                  Free shipping on orders over ₵{SHIPPING_THRESHOLD.toLocaleString()}
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    ₵{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              
              {/* Coupon code */}
              <div className="pt-4">
                <form onSubmit={handleApplyCoupon}>
                  <label htmlFor="coupon-code" className="block text-sm font-medium text-gray-700 mb-1">
                    Apply Coupon Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon-code"
                      className={`input flex-1 ${couponError ? 'border-red-300' : ''}`}
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn-outline ml-2"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="mt-1 text-sm text-red-600">{couponError}</p>
                  )}
                </form>
              </div>
              
              {/* Checkout button */}
              <div className="pt-4">
                <motion.button
                  className="btn-primary w-full py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
              
              {/* Secure checkout */}
              <div className="text-center text-xs text-gray-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
                  Please login to proceed to checkout.
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

export default CartPage;