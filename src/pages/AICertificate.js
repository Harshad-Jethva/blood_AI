import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Confetti from 'react-confetti';
import { 
  FaCertificate, 
  FaDownload, 
  FaPrint, 
  FaShare, 
  FaHeart,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTint,
  FaHandshake,
  FaCampground
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AICertificate = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    donorAddress: '',
    bloodGroup: '',
    donationDate: '',
    campName: '',
    trustName: '',
    certificateNumber: '',
    donorAge: '',
    donorPhone: '',
    donorEmail: ''
  });

  const [certificate, setCertificate] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateCertificate = async () => {
    if (!formData.donorName || !formData.bloodGroup || !formData.donationDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const certificateData = {
      ...formData,
      certificateNumber: `CERT-${Date.now()}`,
      generatedDate: new Date().toLocaleDateString(),
      qrCode: `https://blooddonation.com/cert/${Date.now()}`
    };
    
    setCertificate(certificateData);
    setShowConfetti(true);
    setIsGenerating(false);
    
    toast.success('Certificate generated successfully!');
    
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`blood-donation-certificate-${formData.donorName}.pdf`);
      
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download certificate');
    }
  };

  const printCertificate = () => {
    if (!certificateRef.current) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Blood Donation Certificate</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .certificate { max-width: 800px; margin: 0 auto; border: 3px solid #dc2626; padding: 40px; background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%); }
            .header { text-align: center; margin-bottom: 40px; }
            .logo { font-size: 48px; color: #dc2626; margin-bottom: 10px; }
            .title { font-size: 32px; font-weight: bold; color: #1f2937; margin-bottom: 10px; }
            .subtitle { font-size: 18px; color: #6b7280; }
            .content { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 40px 0; }
            .info-group { margin-bottom: 20px; }
            .label { font-weight: bold; color: #374151; margin-bottom: 5px; }
            .value { font-size: 16px; color: #1f2937; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; }
            .signature { margin-top: 20px; }
            @media print { body { margin: 0; } .certificate { border: none; } }
          </style>
        </head>
        <body>
          ${certificateRef.current.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12">
      {showConfetti && <Confetti />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <FaCertificate className="text-red-500 text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Certificate Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate personalized blood donation certificates with AI-powered design and verification
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Certificate Details
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donor Name *
                  </label>
                  <input
                    type="text"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter donor name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donor Address
                </label>
                <textarea
                  name="donorAddress"
                  value={formData.donorAddress}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter donor address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Date *
                  </label>
                  <input
                    type="date"
                    name="donationDate"
                    value={formData.donationDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donor Age
                  </label>
                  <input
                    type="number"
                    name="donorAge"
                    value={formData.donorAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter age"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Camp Name *
                  </label>
                  <input
                    type="text"
                    name="campName"
                    value={formData.campName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter camp name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trust Name *
                  </label>
                  <input
                    type="text"
                    name="trustName"
                    value={formData.trustName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter trust name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="donorPhone"
                    value={formData.donorPhone}
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
                    name="donorEmail"
                    value={formData.donorEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateCertificate}
                disabled={isGenerating}
                className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-3"></div>
                    Generating Certificate...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaCertificate className="mr-2" />
                    Generate Certificate
                  </div>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Certificate Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {certificate ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Certificate Preview
                  </h2>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadPDF}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={printCertificate}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      <FaPrint className="mr-2" />
                      Print
                    </motion.button>
                  </div>
                </div>
                
                <div
                  ref={certificateRef}
                  className="bg-white rounded-xl shadow-lg p-8 border-4 border-red-500"
                >
                  <div className="text-center mb-8">
                    <FaHeart className="text-red-500 text-4xl mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Blood Donation Certificate
                    </h1>
                    <p className="text-gray-600">
                      Certificate of Appreciation for Voluntary Blood Donation
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaUser className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Donor Name</div>
                          <div className="font-semibold">{certificate.donorName}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaTint className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Blood Group</div>
                          <div className="font-semibold">{certificate.bloodGroup}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Donation Date</div>
                          <div className="font-semibold">{certificate.donationDate}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Address</div>
                          <div className="font-semibold">{certificate.donorAddress}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaCampground className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Camp Name</div>
                          <div className="font-semibold">{certificate.campName}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaHandshake className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Trust Name</div>
                          <div className="font-semibold">{certificate.trustName}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaCertificate className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Certificate No.</div>
                          <div className="font-semibold">{certificate.certificateNumber}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="text-red-500" />
                        <div>
                          <div className="text-sm text-gray-600">Generated Date</div>
                          <div className="font-semibold">{certificate.generatedDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center border-t-2 border-gray-200 pt-6">
                    <p className="text-gray-600 mb-4">
                      This certificate is issued in recognition of your noble contribution to humanity through voluntary blood donation.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="border-t-2 border-gray-400 w-32 mx-auto mb-2"></div>
                        <div className="text-sm text-gray-600">Camp Organizer</div>
                      </div>
                      <div className="text-center">
                        <div className="border-t-2 border-gray-400 w-32 mx-auto mb-2"></div>
                        <div className="text-sm text-gray-600">Trust Director</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <FaCertificate className="text-gray-300 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Certificate Preview
                </h3>
                <p className="text-gray-500">
                  Fill in the form and generate your certificate to see the preview here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AICertificate; 