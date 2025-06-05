import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Hammer } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <Hammer size={24} className="text-primary-400 mr-2" />
              <span className="text-xl font-bold text-white">Machinery<span className="text-primary-400">Hub</span></span>
            </div>
            <p className="mb-4">
              Your trusted source for high-quality machinery, tools, and accessories. 
              We provide professional-grade equipment for contractors, DIY enthusiasts, 
              and industrial applications.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/drills" className="hover:text-primary-400 transition-colors">
                  Drills
                </Link>
              </li>
              <li>
                <Link to="/category/saws" className="hover:text-primary-400 transition-colors">
                  Saws
                </Link>
              </li>
              <li>
                <Link to="/category/sanders" className="hover:text-primary-400 transition-colors">
                  Sanders & Grinders
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-primary-400 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-primary-400 transition-colors">
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary-400 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-primary-400 transition-colors">
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-primary-400" />
                <span>123 Machinery Lane, Industrial District, Accra, Ghana</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary-400" />
                <span>+233 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary-400" />
                <span>info@machineryhub.com</span>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-white">Subscribe to our Newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="input bg-gray-800 border-gray-700 text-white w-full"
                />
                <button type="submit" className="btn-secondary ml-2">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MachineryHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;