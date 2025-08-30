import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaHandshake, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaGlobe,
  FaUsers,
  FaTint,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaStar,
  FaRegStar,
  FaShieldAlt,
  FaCalendarAlt,
  FaArrowRight
} from 'react-icons/fa';

const TrustManagement = () => {
  const [trusts, setTrusts] = useState([]);
  const [filteredTrusts, setFilteredTrusts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Dummy data for trusts
  const dummyTrusts = [
    {
      id: 1,
      name: "Red Cross Blood Bank",
      type: "Blood Bank",
      status: "Active",
      location: "Downtown Medical District",
      contact: {
        phone: "+1 (555) 123-4567",
        email: "info@redcross.org",
        website: "www.redcross.org"
      },
      stats: {
        totalDonors: 15420,
        totalDonations: 45230,
        monthlyDonations: 1200,
        bloodGroups: {
          'A+': 25,
          'A-': 8,
          'B+': 20,
          'B-': 7,
          'AB+': 5,
          'AB-': 2,
          'O+': 28,
          'O-': 5
        }
      },
      rating: 4.8,
      reviews: 156,
      established: "1995",
      description: "Leading blood bank providing safe and reliable blood products to hospitals and medical facilities.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "City Hospital Blood Center",
      type: "Hospital",
      status: "Active",
      location: "Medical Center Complex",
      contact: {
        phone: "+1 (555) 987-6543",
        email: "bloodcenter@cityhospital.com",
        website: "www.cityhospital.com"
      },
      stats: {
        totalDonors: 8920,
        totalDonations: 26750,
        monthlyDonations: 850,
        bloodGroups: {
          'A+': 30,
          'A-': 10,
          'B+': 25,
          'B-': 8,
          'AB+': 3,
          'AB-': 2,
          'O+': 20,
          'O-': 2
        }
      },
      rating: 4.6,
      reviews: 89,
      established: "2000",
      description: "Hospital-based blood center serving the local community with comprehensive blood services.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Community Blood Trust",
      type: "Community",
      status: "Active",
      location: "Community Health Center",
      contact: {
        phone: "+1 (555) 456-7890",
        email: "info@communityblood.org",
        website: "www.communityblood.org"
      },
      stats: {
        totalDonors: 5670,
        totalDonations: 18900,
        monthlyDonations: 650,
        bloodGroups: {
          'A+': 28,
          'A-': 9,
          'B+': 22,
          'B-': 8,
          'AB+': 4,
          'AB-': 2,
          'O+': 25,
          'O-': 2
        }
      },
      rating: 4.7,
      reviews: 67,
      established: "2005",
      description: "Community-driven blood trust focused on local blood donation and distribution.",
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Emergency Blood Services",
      type: "Emergency",
      status: "Active",
      location: "Emergency Medical Center",
      contact: {
        phone: "+1 (555) 911-0000",
        email: "emergency@bloodservices.org",
        website: "www.emergencyblood.org"
      },
      stats: {
        totalDonors: 3240,
        totalDonations: 10800,
        monthlyDonations: 450,
        bloodGroups: {
          'A+': 35,
          'A-': 12,
          'B+': 28,
          'B-': 10,
          'AB+': 2,
          'AB-': 1,
          'O+': 10,
          'O-': 2
        }
      },
      rating: 4.9,
      reviews: 45,
      established: "2010",
      description: "Specialized emergency blood services providing critical blood supply for emergency situations.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "University Blood Bank",
      type: "Educational",
      status: "Active",
      location: "University Medical Center",
      contact: {
        phone: "+1 (555) 234-5678",
        email: "bloodbank@university.edu",
        website: "www.universityblood.edu"
      },
      stats: {
        totalDonors: 4230,
        totalDonations: 14200,
        monthlyDonations: 380,
        bloodGroups: {
          'A+': 32,
          'A-': 11,
          'B+': 26,
          'B-': 9,
          'AB+': 3,
          'AB-': 2,
          'O+': 15,
          'O-': 2
        }
      },
      rating: 4.5,
      reviews: 78,
      established: "2008",
      description: "University-affiliated blood bank serving students, faculty, and the academic community.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrusts(dummyTrusts);
      setFilteredTrusts(dummyTrusts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterTrusts();
  }, [searchTerm, selectedStatus, selectedType, trusts]);

  const filterTrusts = () => {
    let filtered = trusts;

    if (searchTerm) {
      filtered = filtered.filter(trust =>
        trust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trust.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trust.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(trust => trust.status === selectedStatus);
    }

    if (selectedType) {
      filtered = filtered.filter(trust => trust.type === selectedType);
    }

    setFilteredTrusts(filtered);
  };

  const handleEdit = (trustId) => {
    toast.success('Edit functionality will be implemented soon!');
  };

  const handleDelete = (trustId) => {
    toast.success('Delete functionality will be implemented soon!');
  };

  const handleView = (trustId) => {
    toast.success('View details functionality will be implemented soon!');
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
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Blood Bank':
        return 'bg-red-100 text-red-800';
      case 'Hospital':
        return 'bg-blue-100 text-blue-800';
      case 'Community':
        return 'bg-green-100 text-green-800';
      case 'Emergency':
        return 'bg-orange-100 text-orange-800';
      case 'Educational':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trust management...</p>
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
            <FaHandshake className="text-red-500 text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trust Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive management of blood banks, trusts, and donation organizations
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search trusts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <FaShieldAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            
            <div className="relative">
              <FaHandshake className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Blood Bank">Blood Bank</option>
                <option value="Hospital">Hospital</option>
                <option value="Community">Community</option>
                <option value="Emergency">Emergency</option>
                <option value="Educational">Educational</option>
              </select>
            </div>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('');
                setSelectedType('');
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Clear Filters
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Add Trust
            </motion.button>
          </div>
        </motion.div>

        {/* Trusts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredTrusts.map((trust, index) => (
            <motion.div
              key={trust.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="relative">
                <img
                  src={trust.image}
                  alt={trust.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trust.status)}`}>
                    {trust.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(trust.type)}`}>
                    {trust.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{trust.name}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(trust.rating)}
                    <span className="text-sm text-gray-600 ml-1">({trust.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{trust.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    {trust.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2 text-red-500" />
                    Established: {trust.established}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="mr-2 text-red-500" />
                    {trust.stats.totalDonors.toLocaleString()} donors
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaTint className="mr-2 text-red-500" />
                    {trust.stats.totalDonations.toLocaleString()} donations
                  </div>
                </div>

                {/* Blood Group Distribution */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Blood Group Distribution</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(trust.stats.bloodGroups).map(([group, percentage]) => (
                      <div key={group} className="text-center">
                        <div className="text-xs font-medium text-gray-900">{group}</div>
                        <div className="text-xs text-gray-600">{percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleView(trust.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center"
                    >
                      <FaEye className="mr-2" />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(trust.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(trust.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </motion.button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{trust.contact.phone}</div>
                    <div className="text-sm text-gray-600">{trust.contact.email}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredTrusts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaHandshake className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No trusts found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or add a new trust.
            </p>
          </motion.div>
        )}

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaChartBar className="text-red-500 text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Trusts</h3>
            <p className="text-3xl font-bold text-red-500">{trusts.length}</p>
            <p className="text-sm text-gray-600">Active organizations</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaUsers className="text-blue-500 text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Donors</h3>
            <p className="text-3xl font-bold text-blue-500">
              {trusts.reduce((sum, trust) => sum + trust.stats.totalDonors, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Registered donors</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaTint className="text-green-500 text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Donations</h3>
            <p className="text-3xl font-bold text-green-500">
              {trusts.reduce((sum, trust) => sum + trust.stats.totalDonations, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Blood donations</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustManagement; 