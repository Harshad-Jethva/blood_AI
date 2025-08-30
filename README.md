# Blood Donation System - AI Powered

A comprehensive blood donation camp and trust management system with AI-powered features including certificate generation, intelligent chatbot, and advanced analytics.

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Framer Motion animations
- **AI Certificate Generator**: Generate personalized donation certificates with donor details
- **AI Chatbot**: Intelligent assistant for blood donation queries and information
- **Dashboard**: Advanced analytics with charts and real-time statistics
- **Donation Camps**: Browse and register for blood donation camps
- **Trust Management**: Comprehensive management of blood banks and trusts
- **Registration System**: Multi-step donor registration with validation

### Backend (PHP + MongoDB)
- **RESTful API**: Complete CRUD operations for all entities
- **MongoDB Integration**: NoSQL database for flexible data storage
- **AI Certificate API**: Backend support for certificate generation
- **Data Validation**: Comprehensive input validation and error handling
- **CORS Support**: Cross-origin resource sharing enabled

### AI Features
- **Smart Certificate Generation**: AI-powered certificate creation with donor details
- **Intelligent Chatbot**: Knowledge base for blood donation queries
- **Analytics Dashboard**: Real-time statistics and data visualization
- **Predictive Features**: Advanced analytics for donation trends

## 🛠️ Technology Stack

### Frontend
- **React.js 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Advanced animations and transitions
- **React Router**: Client-side routing
- **Chart.js**: Data visualization and analytics
- **React Icons**: Comprehensive icon library
- **React Hot Toast**: User notifications
- **jsPDF**: PDF generation for certificates

### Backend
- **PHP 7.4+**: Server-side scripting
- **MongoDB**: NoSQL database
- **MongoDB PHP Driver**: Database connectivity
- **Composer**: Dependency management

### Database
- **MongoDB**: Document-based NoSQL database
- **Collections**: donors, camps, trusts, certificates, analytics

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **PHP** (v7.4 or higher)
- **MongoDB** (v4.4 or higher)
- **Composer** (PHP package manager)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blood_donation_system
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The React application will be available at `http://localhost:3000`

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Start PHP development server
php -S localhost:8000 -t public
```

The PHP API will be available at `http://localhost:8000`

### 4. MongoDB Setup

1. **Install MongoDB** (if not already installed)
   - Download from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your operating system

2. **Start MongoDB Service**
   ```bash
   # On Windows
   net start MongoDB

   # On macOS/Linux
   sudo systemctl start mongod
   ```

3. **Create Database**
   ```bash
   # Connect to MongoDB shell
   mongosh

   # Create database
   use blood_donation_system

   # Create collections
   db.createCollection('donors')
   db.createCollection('camps')
   db.createCollection('trusts')
   db.createCollection('certificates')
   db.createCollection('analytics')
   ```

### 5. Environment Configuration

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=blood_donation_system
JWT_SECRET=your-secret-key-here
```

## 📁 Project Structure

```
blood_donation_system/
├── src/                          # React frontend source
│   ├── components/               # Reusable components
│   ├── pages/                   # Page components
│   ├── App.js                   # Main app component
│   └── index.js                 # Entry point
├── backend/                     # PHP backend
│   ├── api/                     # API endpoints
│   ├── config/                  # Configuration files
│   ├── vendor/                  # Composer dependencies
│   └── composer.json            # PHP dependencies
├── public/                      # Static files
├── package.json                 # Node.js dependencies
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

## 🔧 API Endpoints

### Donors
- `GET /api/donors` - Get all donors
- `GET /api/donors?id={id}` - Get specific donor
- `POST /api/donors` - Create new donor
- `PUT /api/donors?id={id}` - Update donor
- `DELETE /api/donors?id={id}` - Delete donor

### Camps
- `GET /api/camps` - Get all camps
- `GET /api/camps?id={id}` - Get specific camp
- `POST /api/camps` - Create new camp
- `PUT /api/camps?id={id}` - Update camp
- `DELETE /api/camps?id={id}` - Delete camp

### AI Certificate
- `POST /api/ai-certificate` - Generate AI certificate

## 🎨 Features Overview

### AI Certificate Generation
- Personalized certificates with donor information
- AI-powered design and layout
- QR code integration for verification
- PDF download and printing capabilities

### Intelligent Chatbot
- Blood group information and compatibility
- Donation process guidance
- Camp and trust information
- Safety guidelines and eligibility criteria

### Dashboard Analytics
- Real-time donation statistics
- Blood group distribution charts
- Camp performance metrics
- Donor registration trends

### Trust Management
- Comprehensive trust and blood bank management
- Performance analytics
- Contact information management
- Status tracking and reporting

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the React application:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting platform

### Backend Deployment (Heroku/DigitalOcean)

1. Configure your hosting environment
2. Install PHP and MongoDB
3. Upload backend files
4. Configure environment variables
5. Start the PHP server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible NoSQL database
- All contributors and supporters

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Made with ❤️ for humanity**
