import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  FaHeart, 
  FaUsers, 
  FaCertificate, 
  FaRobot, 
  FaChartBar, 
  FaArrowRight,
  FaTint,
  FaHandshake,
  FaShieldAlt,
  FaGlobe,
  FaMobileAlt
} from 'react-icons/fa';

const Home = () => {
  const [stats, setStats] = useState({
    donors: 0,
    camps: 0,
    trusts: 0,
    lives: 0
  });

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setStats({
        donors: 15420,
        camps: 156,
        trusts: 89,
        lives: 45230
      });
    }
  }, [inView]);

  const features = [
    {
      icon: FaTint,
      title: "AI-Powered Certificate Generation",
      description: "Automatically generate personalized donation certificates with donor details, camp information, and trust details."
    },
    {
      icon: FaRobot,
      title: "Intelligent AI Chatbot",
      description: "Get instant answers about blood groups, donation processes, and camp information through our AI assistant."
    },
    {
      icon: FaHandshake,
      title: "Trust Management System",
      description: "Comprehensive management of blood banks, trusts, and donation organizations with real-time tracking."
    },
    {
      icon: FaChartBar,
      title: "Advanced Analytics Dashboard",
      description: "Detailed insights and analytics for donation trends, camp performance, and trust activities."
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with encrypted data storage and secure communication protocols."
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Responsive",
      description: "Access the system from any device with our fully responsive and mobile-optimized interface."
    }
  ];

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-blue-50 overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-red-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="flex justify-center mb-6">
              <FaHeart className="text-red-500 text-6xl heartbeat" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">AI-Powered</span>
              <br />
              Blood Donation System
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Revolutionizing blood donation management with artificial intelligence. 
              Connect donors, camps, and trusts to save lives together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/donor-registration"
                  className="inline-flex items-center px-8 py-4 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300 btn-pulse"
                >
                  Start Donating
                  <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/ai-chatbot"
                  className="inline-flex items-center px-8 py-4 bg-white text-red-500 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 border-2 border-red-500"
                >
                  <FaRobot className="mr-2" />
                  AI Assistant
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-500 mb-2">
                <CountUp end={stats.donors} duration={2.5} />+
              </div>
              <div className="text-gray-600">Donors Registered</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-500 mb-2">
                <CountUp end={stats.camps} duration={2.5} />+
              </div>
              <div className="text-gray-600">Donation Camps</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-500 mb-2">
                <CountUp end={stats.trusts} duration={2.5} />+
              </div>
              <div className="text-gray-600">Trusts Managed</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-500 mb-2">
                <CountUp end={stats.lives} duration={2.5} />+
              </div>
              <div className="text-gray-600">Lives Saved</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered system provides cutting-edge features for efficient blood donation management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Icon className="text-red-500 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">
              Join thousands of donors and organizations in our mission to save lives through efficient blood donation management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/donor-registration"
                  className="inline-flex items-center px-8 py-4 bg-white text-red-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
                >
                  Register as Donor
                  <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/camp-registration"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-red-500 transition-all duration-300"
                >
                  Organize Camp
                  <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 