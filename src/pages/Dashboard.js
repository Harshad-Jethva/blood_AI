import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartBar, 
  FaUsers, 
  FaTint, 
  FaCampground, 
  FaHandshake,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus
} from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalDonors: 15420,
    totalCamps: 156,
    totalTrusts: 89,
    totalDonations: 45230,
    monthlyGrowth: 12.5,
    bloodGroupDistribution: {
      'A+': 25,
      'A-': 8,
      'B+': 20,
      'B-': 7,
      'AB+': 5,
      'AB-': 2,
      'O+': 28,
      'O-': 5
    }
  });

  // Dummy data for charts
  const donationTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Donations',
        data: [1200, 1350, 1100, 1400, 1600, 1800, 1700, 1900, 2100, 2000, 2200, 2400],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }
    ]
  };

  const campPerformance = {
    labels: ['City Hospital', 'Red Cross', 'Community Center', 'University', 'Corporate Office'],
    datasets: [
      {
        label: 'Donations',
        data: [450, 380, 320, 280, 220],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }
    ]
  };

  const bloodGroupChart = {
    labels: Object.keys(stats.bloodGroupDistribution),
    datasets: [
      {
        data: Object.values(stats.bloodGroupDistribution),
        backgroundColor: [
          '#ef4444', '#f97316', '#eab308', '#84cc16',
          '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const recentDonors = [
    {
      id: 1,
      name: 'John Doe',
      bloodGroup: 'A+',
      donationDate: '2024-01-15',
      camp: 'City Hospital',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Jane Smith',
      bloodGroup: 'O+',
      donationDate: '2024-01-14',
      camp: 'Red Cross',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      bloodGroup: 'B+',
      donationDate: '2024-01-13',
      camp: 'Community Center',
      status: 'Scheduled'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      bloodGroup: 'AB+',
      donationDate: '2024-01-12',
      camp: 'University',
      status: 'Completed'
    }
  ];

  const upcomingCamps = [
    {
      id: 1,
      name: 'Community Blood Drive',
      location: 'City Hall',
      date: '2024-01-20',
      organizer: 'Red Cross',
      expectedDonors: 150
    },
    {
      id: 2,
      name: 'Corporate Donation Camp',
      location: 'Tech Park',
      date: '2024-01-25',
      organizer: 'City Hospital',
      expectedDonors: 80
    },
    {
      id: 3,
      name: 'University Blood Camp',
      location: 'Campus Center',
      date: '2024-01-30',
      organizer: 'University Health',
      expectedDonors: 200
    }
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <FaChartBar className="text-red-500 text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analytics and management overview for blood donation system
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donors</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalDonors.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <FaArrowUp className="mr-1" />
                  +{stats.monthlyGrowth}% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-red-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Camps</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCamps}</p>
                <p className="text-sm text-blue-600 flex items-center">
                  <FaArrowUp className="mr-1" />
                  +8 this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaCampground className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Trusts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTrusts}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <FaArrowUp className="mr-1" />
                  +3 this month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaHandshake className="text-green-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalDonations.toLocaleString()}</p>
                <p className="text-sm text-purple-600 flex items-center">
                  <FaArrowUp className="mr-1" />
                  +15% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaTint className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Trends</h3>
            <Line data={donationTrends} options={chartOptions} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Camp Performance</h3>
            <Bar data={campPerformance} options={chartOptions} />
          </div>
        </motion.div>

        {/* Blood Group Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Group Distribution</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-64">
              <Doughnut data={bloodGroupChart} options={doughnutOptions} />
            </div>
            <div className="space-y-3">
              {Object.entries(stats.bloodGroupDistribution).map(([group, percentage]) => (
                <div key={group} className="flex items-center justify-between">
                  <span className="font-medium">{group}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Recent Donors */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Donors</h3>
              <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentDonors.map((donor) => (
                <div key={donor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <FaUsers className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{donor.name}</p>
                      <p className="text-sm text-gray-600">{donor.bloodGroup} • {donor.camp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{donor.donationDate}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      donor.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {donor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Camps */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Camps</h3>
              <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingCamps.map((camp) => (
                <div key={camp.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{camp.name}</h4>
                    <span className="text-sm text-gray-600">{camp.expectedDonors} donors</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {camp.location}
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {camp.date}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Organized by {camp.organizer}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 