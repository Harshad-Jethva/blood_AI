import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaCampground, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaTint,
  FaArrowRight,
  FaPlus,
  FaTrash
} from 'react-icons/fa';

const CampRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    organizer: '',
    location: '',
    date: '',
    time: '',
    expectedDonors: 100,
    bloodGroups: ['All Groups'],
    description: '',
    contact: {
      phone: '',
      email: '',
      website: ''
    },
    facilities: {
      parking: false,
      refreshments: false,
      medicalStaff: false,
      equipment: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'All Groups'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleBloodGroupChange = (group) => {
    setFormData(prev => {
      if (group === 'All Groups') {
        return { ...prev, bloodGroups: ['All Groups'] };
      }
      
      const currentGroups = prev.bloodGroups.filter(g => g !== 'All Groups');
      
      if (currentGroups.includes(group)) {
        const newGroups = currentGroups.filter(g => g !== group);
        return { ...prev, bloodGroups: newGroups.length > 0 ? newGroups : ['All Groups'] };
      } else {
        return { ...prev, bloodGroups: [...currentGroups, group] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.organizer || !formData.location || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    toast.success('Camp registered successfully! You will receive a confirmation email shortly.');
    
    // Reset form
    setFormData({
      name: '',
      organizer: '',
      location: '',
      date: '',
      time: '',
      expectedDonors: 100,
      bloodGroups: ['All Groups'],
      description: '',
      contact: {
        phone: '',
        email: '',
        website: ''
      },
      facilities: {
        parking: false,
        refreshments: false,
        medicalStaff: false,
        equipment: false
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <FaCampground className="text-red-500 text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Organize Blood Donation Camp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Register your blood donation camp and help save lives in your community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Camp Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Camp Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter camp name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer *
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter organizer name"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter camp location"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Donors
                  </label>
                  <input
                    type="number"
                    name="expectedDonors"
                    value={formData.expectedDonors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Blood Groups */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Groups Needed</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {bloodGroups.map((group) => (
                  <label key={group} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.bloodGroups.includes(group)}
                      onChange={() => handleBloodGroupChange(group)}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{group}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Camp Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describe your camp, special features, or additional information..."
              />
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="contact.website"
                    value={formData.contact.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Facilities</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="facilities.parking"
                    checked={formData.facilities.parking}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Parking Available</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="facilities.refreshments"
                    checked={formData.facilities.refreshments}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Refreshments</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="facilities.medicalStaff"
                    checked={formData.facilities.medicalStaff}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Medical Staff</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="facilities.equipment"
                    checked={formData.facilities.equipment}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Equipment</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-3"></div>
                  Registering Camp...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaCampground className="mr-2" />
                  Register Camp
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CampRegistration; 