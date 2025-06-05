import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Home, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage = () => {
  // In a real app, you would get this from the route params or context
  const orderNumber = '123456';
  const estimatedDelivery = 'June 10, 2025';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-green-50 p-6 border-b border-green-100">
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-12 w-12 text-green-500" aria-hidden="true" />
            </div>
            <div className="ml-3 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
              <p className="mt-1 text-sm text-gray-600">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="px-6 py-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                <p className="mt-1 text-sm text-gray-900">{orderNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1 text-sm text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Estimated Delivery</h3>
                <p className="mt-1 text-sm text-gray-900">{estimatedDelivery}</p>
              </div>
              
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">In Transit</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">What's Next?</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Order Processing</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        We've received your order and are getting it ready for shipment.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="p-4 bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Shipping</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Your order is on its way. Expected delivery by {estimatedDelivery}.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Home className="-ml-1 mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <Link
              to="/category/all"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ShoppingBag className="-ml-1 mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
