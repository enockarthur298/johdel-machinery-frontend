import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Truck, ChevronRight, Info } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Form states
  const [shippingForm, setShippingForm] = useState({
    fullName: user?.name || '',
    company: user?.company || '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Ghana',
    phone: ''
  });
  
  const [billingForm, setBillingForm] = useState({
    fullName: '',
    company: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Ghana',
    phone: ''
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  
  // Shipping cost calculation
  const SHIPPING_RATES = {
    standard: 50,
    express: 150
  };
  
  const shippingCost = SHIPPING_RATES[shippingMethod];
  const total = subtotal + shippingCost;
  
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };
  
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically:
      // 1. Validate all form data
      // 2. Send order to your backend
      // 3. Process payment through payment gateway
      // 4. Handle success/failure
      
      // For demo purposes, we'll simulate a successful order
      const orderNumber = `ORD${Date.now()}`;
      
      // Clear cart and redirect to confirmation
      clearCart();
      navigate(`/order-confirmation/${orderNumber}`);
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error appropriately
    }
  };
  
  const handleShippingFormChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBillingFormChange = (e) => {
    const { name, value } = e.target;
    setBillingForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart to proceed with checkout.</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <span>Cart</span>
            <ChevronRight size={16} className="mx-2" />
            <span className={currentStep >= 1 ? 'text-primary-600 font-medium' : ''}>
              Shipping
            </span>
            <ChevronRight size={16} className="mx-2" />
            <span className={currentStep >= 2 ? 'text-primary-600 font-medium' : ''}>
              Payment
            </span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Form Section */}
            <div className="md:col-span-2">
              {currentStep === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                    <form onSubmit={handleShippingSubmit}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              required
                              className="input"
                              value={shippingForm.fullName}
                              onChange={handleShippingFormChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                              Company (Optional)
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              className="input"
                              value={shippingForm.company}
                              onChange={handleShippingFormChange}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            id="streetAddress"
                            name="streetAddress"
                            required
                            className="input"
                            value={shippingForm.streetAddress}
                            onChange={handleShippingFormChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              required
                              className="input"
                              value={shippingForm.city}
                              onChange={handleShippingFormChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                              State/Region *
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              required
                              className="input"
                              value={shippingForm.state}
                              onChange={handleShippingFormChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Postal Code *
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              required
                              className="input"
                              value={shippingForm.postalCode}
                              onChange={handleShippingFormChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              className="input"
                              value={shippingForm.phone}
                              onChange={handleShippingFormChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                        <div className="space-y-4">
                          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                            <input
                              type="radio"
                              name="shipping"
                              value="standard"
                              checked={shippingMethod === 'standard'}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">Standard Shipping</p>
                                  <p className="text-sm text-gray-500">3-5 business days</p>
                                </div>
                                <span className="font-medium">₵50.00</span>
                              </div>
                            </div>
                          </label>
                          
                          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                            <input
                              type="radio"
                              name="shipping"
                              value="express"
                              checked={shippingMethod === 'express'}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">Express Shipping</p>
                                  <p className="text-sm text-gray-500">1-2 business days</p>
                                </div>
                                <span className="font-medium">₵150.00</span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button type="submit" className="btn-primary w-full py-3">
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                          <div className="space-y-4">
                              <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                  Full Name *
                                </label>
                                <input
                                  type="text"
                                  id="fullName"
                                  name="fullName"
                                  required
                                  className="input w-full"
                                  value={shippingForm.fullName}
                                  readOnly
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  required
                                  className="input w-full"
                                  value={user?.email || ''}
                                  readOnly={!!user?.email}
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                  Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  id="phoneNumber"
                                  name="phone"
                                  required
                                  className="input w-full"
                                  value={shippingForm.phone}
                                  readOnly
                                />
                              </div>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              required
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              I agree to the Terms of Service and Privacy Policy
                            </span>
                          </label>
                        </div>
                        
                        <div className="mt-8 space-y-4">
                          <button type="submit" className="btn-primary w-full py-3">
                            Place Order
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="btn-outline w-full py-3"
                          >
                            Back to Shipping
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center">
                      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          ₵{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₵{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₵{shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₵{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center">
                    <Info size={20} className="text-gray-400" />
                    <p className="ml-3 text-sm text-gray-600">
                      Your order will be processed securely through our payment gateway.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;