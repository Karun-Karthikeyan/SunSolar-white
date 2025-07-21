import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

const companies = [
  "GetSolar Company",
  "Solar Energy Solutions",
  "Green Power Systems",
  "Eco Solar Solutions",
  "Bright Energy Company",
];

const quickLinks = [
  "About Us",
  "Solar Companies",
  "Solar Calculator",
  "Contact Us",
  "Blog",
  "Privacy Policy"
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">GetSolar Company</h3>
              <p className="text-black text-sm leading-relaxed">
                Your trusted partner in finding the best solar energy solutions. 
                Connect with top-rated solar companies across the nation.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-500">
                <FaPhone className="text-pink-500 w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <FaEnvelope className="text-pink-500 w-4 h-4" />
                <span className="text-sm">info@getsolar.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <FaMapMarkerAlt className="text-pink-500 w-4 h-4" />
                <span className="text-sm">123 Solar Street, Energy City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-pink-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-pink-500 transition-colors duration-200"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Popular Companies */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              Popular Companies
            </h4>
            <ul className="space-y-3">
              {companies.map((company) => (
                <li key={company}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-500 transition-colors duration-200"></span>
                    {company}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              Stay Connected
            </h4>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-black text-sm mb-4">
                Subscribe to get the latest solar industry updates and exclusive offers.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm transition-all duration-200 text-black placeholder-gray-500"
                />
                <button 
                  type="submit" 
                  className="bg-[#ff106e] text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            {/* Social Media */}
            <div>
              <p className="text-black text-sm mb-4">Follow us on social media</p>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-500 hover:to-blue-700 transition-all duration-200 transform hover:scale-110 shadow-md"
                >
                  <FaTwitter size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-900 transition-all duration-200 transform hover:scale-110 shadow-md"
                >
                  <FaFacebookF size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-600 rounded-lg flex items-center justify-center text-white hover:from-pink-500 hover:to-purple-700 transition-all duration-200 transform hover:scale-110 shadow-md"
                >
                  <FaInstagram size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-110 shadow-md"
                >
                  <FaYoutube size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-110 shadow-md"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-black">
              <a href="#" className="hover:text-pink-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-pink-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-pink-400 transition-colors duration-200">Cookie Policy</a>
            </div>
            <div className="text-sm text-gray-700">
              <p>&copy; 2025 GetSolarCompany.com. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 