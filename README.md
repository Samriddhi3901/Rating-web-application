# Rating Web Application

A comprehensive full-stack web application that allows users to submit ratings for registered stores with role-based access control and administrative features.

## 🚀 Overview

This Rating Web Application is built as part of a FullStack Intern Coding Challenge. It provides a platform where users can register, log in, and rate stores based on their experiences. The application features three distinct user roles with specific functionalities tailored to each role's needs.

## ✨ Features

- **Multi-role Authentication System**: Support for System Administrator, Normal User, and Store Owner roles
- **Store Rating System**: Users can rate stores on a scale of 1-5
- **Administrative Dashboard**: Comprehensive analytics and management tools
- **Real-time Data**: Live updates of ratings and user statistics
- **Advanced Filtering**: Search and filter functionality across all data listings
- **Responsive Design**: Mobile-friendly interface built with ReactJS
- **Form Validation**: Robust client and server-side validation
- **Secure Authentication**: JWT-based authentication with role-based access control

## 🛠 Tech Stack

### Backend
- **Framework**: Express.js/Loopback/NestJS (choose one)
- **Database**: PostgreSQL or MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Security**: bcrypt for password hashing

### Frontend
- **Framework**: ReactJS
- **State Management**: Context API/Redux
- **Routing**: React Router
- **UI Components**: Bootstrap
- **HTTP Client**: Axios

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm/yarn
- **Code Formatting**: Prettier

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React.js)    │◄──►│   (Express.js)  │◄──►│(PostgreSQL/     │
│                 │    │                 │    │  NeonDb/MySQL)  │
│ - Components    │    │ - Routes        │    │                 │
│ - State Mgmt    │    │ - Controllers   │    │ - Users         │
│ - Authentication│    │ - Middleware    │    │ - Stores        │
│ - Forms         │    │ - Validation    │    │ - Ratings       │
│ - Routing       │    │ - Auth Services │    │ - Relationships │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow

1. **Authentication Flow**:
   ```
   User Login → JWT Generation → Token Storage → Protected Route Access
   ```

2. **Rating Submission Flow**:
   ```
   User Selects Store → Rating Form → Validation → Database Update → UI Refresh
   ```

3. **Admin Dashboard Flow**:
   ```
   Admin Login → Dashboard Access → Data Aggregation → Statistics Display
   ```

## 👥 User Roles & Functionalities

### 🔐 System Administrator
**Access Level**: Highest

**Capabilities**:
- ✅ Add new stores, normal users, and admin users
- 📊 Access comprehensive dashboard with:
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- 👤 User management with full CRUD operations
- 🏪 Store management and oversight
- 🔍 Advanced filtering on all listings (Name, Email, Address, Role)
- 📋 Detailed user profiles with role-specific information
- 🚪 Secure logout functionality

### 👤 Normal User
**Access Level**: Standard

**Capabilities**:
- 📝 Self-registration through signup form
- 🔐 Secure login and authentication
- 🔒 Password update functionality
- 🏪 Browse all registered stores
- 🔍 Search stores by Name and Address
- ⭐ Submit ratings (1-5) for stores
- ✏️ Modify previously submitted ratings
- 📊 View personal rating history
- 🚪 Secure logout functionality

### 🏪 Store Owner
**Access Level**: Store-specific

**Capabilities**:
- 🔐 Secure login access
- 🔒 Password update functionality
- 📊 Personalized dashboard featuring:
  - List of users who rated their store
  - Average rating calculation
  - Rating analytics and trends
- 🚪 Secure logout functionality

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL or MySQL database
- Git

### Clone Repository
```bash
git clone https://github.com/Samriddhi3901/Rating-web-application.git
cd Rating-web-application
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
# DATABASE_URL, JWT_SECRET, etc.

# Run database migrations
npm run migrate

# Seed initial data (optional)
npm run seed

# Start backend server
npm start
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure API endpoints
# Update src/config/api.js with your backend URL

# Start development server
npm start
```

### Database Setup
```sql
-- Create database
CREATE DATABASE rating_app;

-- Create user (PostgreSQL example)
CREATE USER rating_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE rating_app TO rating_user;
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/rating_app

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration (src/config/api.js)
```javascript
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  ENDPOINTS: {
    AUTH: '/auth',
    USERS: '/users',
    STORES: '/stores',
    RATINGS: '/ratings'
  }
};

export default API_CONFIG;
```

## 📡 API Documentation

### Authentication Endpoints
```
POST /api/auth/register        # User registration
POST /api/auth/login          # User login
POST /api/auth/logout         # User logout
PUT  /api/auth/change-password # Change password
```

### User Management Endpoints
```
GET    /api/users             # Get all users (Admin only)
POST   /api/users             # Create user (Admin only)
GET    /api/users/:id         # Get user details
PUT    /api/users/:id         # Update user
DELETE /api/users/:id         # Delete user (Admin only)
```

### Store Management Endpoints
```
GET    /api/stores            # Get all stores
POST   /api/stores            # Create store (Admin only)
GET    /api/stores/:id        # Get store details
PUT    /api/stores/:id        # Update store
DELETE /api/stores/:id        # Delete store (Admin only)
GET    /api/stores/search     # Search stores
```

### Rating Endpoints
```
GET    /api/ratings           # Get all ratings
POST   /api/ratings           # Submit rating
PUT    /api/ratings/:id       # Update rating
DELETE /api/ratings/:id       # Delete rating
GET    /api/ratings/store/:id # Get store ratings
GET    /api/ratings/user/:id  # Get user ratings
```

### Dashboard Endpoints
```
GET /api/dashboard/admin      # Admin dashboard data
GET /api/dashboard/store/:id  # Store owner dashboard
```

## ✅ Form Validations

### User Registration/Profile
- **Name**: 
  - Minimum 20 characters
  - Maximum 60 characters
  - Required field
  
- **Email**: 
  - Valid email format
  - Unique in database
  - Required field
  
- **Password**: 
  - 8-16 characters
  - At least one uppercase letter
  - At least one special character
  - Required field
  
- **Address**: 
  - Maximum 400 characters
  - Optional field

### Rating Validation
- **Rating Value**: 
  - Integer between 1 and 5
  - Required field
  - One rating per user per store

### Search Validation
- **Store Search**: 
  - Minimum 2 characters
  - Alphanumeric with spaces allowed

## 📁 Project Structure

```
Rating-web-application/
├── frontend/                   # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   └── rating/
│   │   ├── pages/             # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── Stores.js
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   ├── hooks/             # Custom hooks
│   │   ├── context/           # React context
│   │   ├── config/            # Configuration files
│   │   └── App.js
│   ├── package.json
│   └── README.md
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── services/         # Business logic
│   │   ├── config/           # Configuration
│   │   ├── utils/            # Utility functions
│   │   └── app.js
│   ├── migrations/           # Database migrations
│   ├── seeds/               # Database seeds
│   ├── tests/               # Test files
│   ├── package.json
│   └── .env.example
├── docs/                     # Documentation
├── .gitignore
├── README.md
└── LICENSE
```
## 🚀 Deployment

### Production Build
```bash
# Frontend build
cd frontend
npm run build

# Backend preparation
cd backend
npm run build
```

### Environment Setup
- Configure production database
- Set environment variables
- Configure reverse proxy (Nginx)
- Set up SSL certificates
- Configure monitoring and logging

## 📊 Performance Considerations

- **Database Indexing**: Proper indexes on frequently queried fields
- **Caching**: Redis for session management and frequently accessed data
- **Pagination**: Implement pagination for large data sets
- **Image Optimization**: Compress and optimize store images
- **Code Splitting**: Implement lazy loading for React components
- **API Rate Limiting**: Prevent abuse with rate limiting middleware

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Rate Limiting**: Prevent brute force attacks
- **Helmet.js**: Security headers for Express.js

## 📈 Future Enhancements

- **Email Notifications**: Rating notifications for store owners
- **Advanced Analytics**: Detailed rating analytics and trends
- **Mobile App**: React Native mobile application
- **Review Comments**: Allow users to add text reviews
- **Image Uploads**: Store photos and user avatars
- **Social Features**: User profiles and social interactions
- **API Versioning**: Implement API versioning for future updates


**Happy Coding! 🚀**
