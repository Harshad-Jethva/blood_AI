import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DonationCamp from './pages/DonationCamp';
import TrustManagement from './pages/TrustManagement';
import AICertificate from './pages/AICertificate';
import AIChatbot from './pages/AIChatbot';
import Dashboard from './pages/Dashboard';
import DonorRegistration from './pages/DonorRegistration';
import CampRegistration from './pages/CampRegistration';
import TrustRegistration from './pages/TrustRegistration';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donation-camp" element={<DonationCamp />} />
            <Route path="/trust-management" element={<TrustManagement />} />
            <Route path="/ai-certificate" element={<AICertificate />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donor-registration" element={<DonorRegistration />} />
            <Route path="/camp-registration" element={<CampRegistration />} />
            <Route path="/trust-registration" element={<TrustRegistration />} />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App; 