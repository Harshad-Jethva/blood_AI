import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaRobot, 
  FaUser, 
  FaPaperPlane, 
  FaMicrophone,
  FaHeart,
  FaTint,
  FaInfoCircle,
  FaQuestionCircle,
  FaLightbulb,
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt
} from 'react-icons/fa';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI Blood Donation Assistant. I can help you with information about blood groups, donation processes, camps, and trusts. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Knowledge Base
  const knowledgeBase = {
    'blood groups': {
      content: "There are 8 main blood groups: A+, A-, B+, B-, AB+, AB-, O+, and O-. Each has specific antigens and antibodies. O- is the universal donor, while AB+ is the universal recipient.",
      suggestions: ["What are the rarest blood types?", "Can I donate if I have a specific blood type?", "What's the universal donor?"]
    },
    'donation process': {
      content: "The blood donation process takes about 1 hour total. It includes registration, medical screening, donation (10-15 minutes), and refreshments. You must be 18+ years old, weigh at least 110 lbs, and be in good health.",
      suggestions: ["How often can I donate?", "What should I eat before donating?", "Are there any side effects?"]
    },
    'eligibility': {
      content: "To donate blood, you must be at least 18 years old, weigh at least 110 lbs, be in good health, and not have donated in the last 56 days. Some medical conditions and medications may affect eligibility.",
      suggestions: ["Can I donate if I have diabetes?", "What medications prevent donation?", "Age restrictions for donation"]
    },
    'camps': {
      content: "Blood donation camps are organized events where multiple donors can donate blood. They're usually organized by hospitals, trusts, or community organizations. You can find upcoming camps in our donation camps section.",
      suggestions: ["How to organize a camp?", "Find camps near me", "Camp registration process"]
    },
    'trusts': {
      content: "Blood banks and trusts are organizations that collect, test, store, and distribute blood. They ensure blood safety and maintain adequate supplies for medical emergencies.",
      suggestions: ["Trust registration", "Blood bank locations", "Trust management features"]
    },
    'safety': {
      content: "Blood donation is very safe. All equipment is sterile and used only once. The process is supervised by trained medical professionals. Donors are screened for health conditions that could affect donation safety.",
      suggestions: ["Infection risks", "Medical screening process", "Post-donation care"]
    },
    'frequency': {
      content: "You can donate whole blood every 56 days (about 2 months). Platelet donations can be done more frequently. Your body replenishes the donated blood within 24-48 hours.",
      suggestions: ["Platelet donation", "Recovery time", "Blood volume replacement"]
    },
    'preparation': {
      content: "Before donating: Get a good night's sleep, eat a healthy meal, drink plenty of water, bring ID, and avoid alcohol for 24 hours. Wear comfortable clothing with sleeves that can be rolled up.",
      suggestions: ["What to eat before donation", "Medications to avoid", "Clothing recommendations"]
    },
    'after donation': {
      content: "After donating: Rest for 10-15 minutes, drink extra fluids for 24 hours, avoid heavy lifting for 5 hours, eat iron-rich foods, and avoid alcohol for 24 hours. Contact us if you feel unwell.",
      suggestions: ["Recovery tips", "When to call doctor", "Iron-rich foods"]
    }
  };

  const quickQuestions = [
    "What are blood groups?",
    "How often can I donate?",
    "What's the donation process?",
    "Am I eligible to donate?",
    "Find donation camps",
    "Blood bank locations",
    "Safety concerns",
    "Preparation tips"
  ];

  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    let response = null;
    let suggestions = [];

    // Check knowledge base
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        response = data.content;
        suggestions = data.suggestions;
        break;
      }
    }

    // If no specific match, provide general help
    if (!response) {
      response = "I understand you're asking about blood donation. Could you please be more specific? I can help with information about blood groups, donation process, eligibility, camps, trusts, safety, and more.";
      suggestions = ["Blood groups", "Donation process", "Eligibility", "Find camps"];
    }

    // Add follow-up suggestions
    if (suggestions.length > 0) {
      response += "\n\nWould you like to know more about:";
      suggestions.forEach(suggestion => {
        response += `\n• ${suggestion}`;
      });
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const aiResponse = await generateAIResponse(inputMessage);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error('Voice recognition failed. Please try typing instead.');
      };

      recognition.start();
    } else {
      toast.error('Voice recognition is not supported in your browser.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <FaRobot className="text-red-500 text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Blood Donation Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant answers about blood donation, groups, camps, and trusts from our intelligent AI assistant
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Questions Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaLightbulb className="text-yellow-500 mr-2" />
                Quick Questions
              </h3>
              <div className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-sm"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-sm text-red-100">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' ? 'bg-red-500' : 'bg-blue-500'
                        }`}>
                          {message.type === 'user' ? <FaUser className="text-white text-sm" /> : <FaRobot className="text-white text-sm" />}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaRobot className="text-white text-sm" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about blood donation..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      rows="2"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleVoiceInput}
                      disabled={isListening}
                      className={`p-3 rounded-lg ${
                        isListening 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } transition-colors duration-300`}
                    >
                      <FaMicrophone />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPaperPlane />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaTint className="text-red-500 text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blood Group Info</h3>
            <p className="text-gray-600 text-sm">
              Learn about different blood types, compatibility, and donation requirements
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaShieldAlt className="text-blue-500 text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Guidelines</h3>
            <p className="text-gray-600 text-sm">
              Get information about donation safety, eligibility, and health requirements
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaMapMarkerAlt className="text-green-500 text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Camp Locations</h3>
            <p className="text-gray-600 text-sm">
              Find nearby donation camps and blood bank locations
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatbot; 