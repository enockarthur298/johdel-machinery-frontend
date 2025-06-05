import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, ShoppingCart, User, ChevronDown, 
  Hammer
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { categories } from '../../data/mockData';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Hammer size={28} className="text-primary-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Johdel <span className="text-primary-600">Machinery</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.slice(0, 4).map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                {category.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-primary-600 font-medium">
                More <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  {categories.slice(4).map(category => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
          
          {/* Search, Cart, Account */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search products..."
                className="input w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 p-1 text-gray-500 hover:text-primary-600"
              >
                <Search size={18} />
              </button>
            </form>
            
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-primary-600" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-primary-600">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <p className="block px-4 py-2 text-sm text-gray-900 font-medium border-b">
                      Hi, {user?.name}
                    </p>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary-600">
                <User size={24} />
              </Link>
            )}
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <input
              type="text"
              placeholder="Search products..."
              className="input w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 p-1 text-gray-500 hover:text-primary-600"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              className="absolute top-0 right-0 w-4/5 h-full bg-white overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} className="text-gray-700" />
                </button>
              </div>
              
              <nav className="px-4 py-2">
                <ul className="space-y-1">
                  {categories.map(category => (
                    <li key={category.id}>
                      <Link 
                        to={`/category/${category.id}`}
                        className="flex items-center py-3 px-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{category.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t my-2 pt-2">
                    {isAuthenticated ? (
                      <>
                        <div className="px-2 py-3 text-gray-900 font-medium">
                          Hi, {user?.name}
                        </div>
                        <Link 
                          to="/profile"
                          className="flex items-center py-3 px-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link 
                          to="/profile/orders"
                          className="flex items-center py-3 px-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center py-3 px-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link 
                        to="/login"
                        className="flex items-center py-3 px-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login / Register
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;