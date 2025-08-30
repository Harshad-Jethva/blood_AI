import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FaHeart className="text-red-500 text-2xl heartbeat" />
              <h3 className="text-xl font-bold">Blood Donation System</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering communities through AI-driven blood donation management. 
              We connect donors, camps, and trusts to save lives together.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donation-camp" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  Donation Camps
                </Link>
              </li>
              <li>
                <Link to="/trust-management" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  Trust Management
                </Link>
              </li>
              <li>
                <Link to="/ai-certificate" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  AI Certificate
                </Link>
              </li>
              <li>
                <Link to="/ai-chatbot" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  AI Chatbot
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-gray-300">123 Blood Drive St, City</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-red-500" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-red-500" />
                <span className="text-gray-300">info@blooddonation.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {currentYear} Blood Donation System. All rights reserved. 
            Made with <FaHeart className="inline text-red-500" /> for humanity.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 