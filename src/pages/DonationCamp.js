import React, { useState, useEffect } from 'react';
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
  FaSearch,
  FaFilter,
  FaHeart,
  FaHandshake,
  FaArrowRight,
  FaStar,
  FaRegStar
} from 'react-icons/fa';

const DonationCamp = () => {
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Dummy data for camps
  const dummyCamps = [
    {
      id: 1,
      name: "Community Blood Drive",
      organizer: "Red Cross Society",
      location: "City Hall, Downtown",
      date: "2024-01-20",
      time: "09:00 AM - 05:00 PM",
      expectedDonors: 150,
      registeredDonors: 120,
      bloodGroups: ["A+", "B+", "O+", "AB+"],
      description: "Annual community blood donation drive to support local hospitals and emergency services.",
      contact: {
        phone: "+1 (555) 123-4567",
        email: "blooddrive@redcross.org"
      },
      rating: 4.8,
      reviews: 45,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Corporate Blood Donation Camp",
      organizer: "City Hospital",
      location: "Tech Park, Business District",
      date: "2024-01-25",
      time: "10:00 AM - 06:00 PM",
      expectedDonors: 80,
      registeredDonors: 65,
      bloodGroups: ["All Groups"],
      description: "Corporate blood donation camp organized by City Hospital for employees and their families.",
      contact: {
        phone: "+1 (555) 987-6543",
        email: "donation@cityhospital.com"
      },
      rating: 4.6,
      reviews: 32,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "University Blood Camp",
      organizer: "University Health Services",
      location: "Campus Center, University",
      date: "2024-01-30",
      time: "08:00 AM - 04:00 PM",
      expectedDonors: 200,
      registeredDonors: 180,
      bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      description: "University-wide blood donation camp for students, faculty, and staff.",
      contact: {
        phone: "+1 (555) 456-7890",
        email: "health@university.edu"
      },
      rating: 4.9,
      reviews: 78,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Emergency Blood Drive",
      organizer: "Emergency Medical Services",
      location: "Emergency Center, Medical District",
      date: "2024-01-15",
      time: "24/7",
      expectedDonors: 50,
      registeredDonors: 45,
      bloodGroups: ["O+", "O-", "A+", "B+"],
      description: "Emergency blood drive to maintain critical blood supply for emergency situations.",
      contact: {
        phone: "+1 (555) 911-0000",
        email: "emergency@ems.org"
      },
      rating: 4.7,
      reviews: 23,
      status: "ongoing",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Community Health Fair",
      organizer: "Community Health Center",
      location: "Community Park, Suburbs",
      date: "2024-02-05",
      time: "09:00 AM - 06:00 PM",
      expectedDonors: 100,
      registeredDonors: 75,
      bloodGroups: ["All Groups"],
      description: "Health fair including blood donation, health screenings, and wellness activities.",
      contact: {
        phone: "+1 (555) 234-5678",
        email: "health@community.org"
      },
      rating: 4.5,
      reviews: 28,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCamps(dummyCamps);
      setFilteredCamps(dummyCamps);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterCamps();
  }, [searchTerm, selectedLocation, selectedDate, camps]);

  const filterCamps = () => {
    let filtered = camps;

    if (searchTerm) {
      filtered = filtered.filter(camp =>
        camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(camp =>
        camp.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(camp => camp.date === selectedDate);
    }

    setFilteredCamps(filtered);
  };

  const handleRegister = (campId) => {
    toast.success('Registration successful! You will receive a confirmation email shortly.');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          {i <= rating ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return stars;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading donation camps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Blood Donation Camps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find and register for blood donation camps in your area. Join us in saving lives.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search camps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                <option value="downtown">Downtown</option>
                <option value="business district">Business District</option>
                <option value="university">University</option>
                <option value="medical district">Medical District</option>
                <option value="suburbs">Suburbs</option>
              </select>
            </div>
            
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('');
                setSelectedDate('');
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Camps Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCamps.map((camp, index) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="relative">
                <img
                  src={camp.image}
                  alt={camp.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(camp.status)}`}>
                    {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{camp.name}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(camp.rating)}
                    <span className="text-sm text-gray-600 ml-1">({camp.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{camp.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaHandshake className="mr-2 text-red-500" />
                    {camp.organizer}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    {camp.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2 text-red-500" />
                    {camp.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2 text-red-500" />
                    {camp.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="mr-2 text-red-500" />
                    {camp.registeredDonors}/{camp.expectedDonors} registered
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {camp.bloodGroups.map((group, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRegister(camp.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
                    >
                      <FaHeart className="mr-2" />
                      Register
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                      Details
                    </motion.button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{camp.contact.phone}</div>
                    <div className="text-sm text-gray-600">{camp.contact.email}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCamps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaCampground className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No camps found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or check back later for new camps.
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Want to Organize a Camp?</h2>
          <p className="text-xl mb-6">
            Help us save more lives by organizing a blood donation camp in your community.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-white text-red-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            Organize Camp
            <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationCamp; 