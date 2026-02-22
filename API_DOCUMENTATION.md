# 🏠 Real Estate System - Complete Setup & API Documentation

## Project Overview

A full-stack Real Estate Management System built with:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + React Router + Axios
- **Authentication**: JWT with role-based access control
- **Security**: bcryptjs for password hashing, environment variables for secrets

---

## 📋 Quick Start Guide

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd Backend1

# 1. Install dependencies
npm install

# 2. Create .env file (already created)
# Update MONGODB_URI if needed

# 3. Start the server
npm start
# Server runs on http://localhost:3000
```

### Frontend Setup

```bash
cd Frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm start
# Frontend runs on http://localhost:3000
# Note: Update API_URL in src/services/api.js if backend URL is different
```

---

## 🔐 Security Improvements Made

### 1. **Password Security**
- ✅ Passwords hashed with bcryptjs (10-salt rounds)
- ✅ Plain text passwords removed
- ✅ Password change functionality added

### 2. **JWT Authentication**
- ✅ Secret moved to .env file
- ✅ Token includes user ID and role
- ✅ Bearer token format validation
- ✅ Token expiration handling

### 3. **Role-Based Access Control (RBAC)**
- ✅ Admin-only endpoints protected
- ✅ Middleware prevents unauthorized access
- ✅ Three roles: Admin, User, Agent

### 4. **Input Validation**
- ✅ Email validation
- ✅ Password strength requirements (min 6 chars, uppercase, lowercase, numbers)
- ✅ Phone number validation (10 digits)
- ✅ Pincode validation
- ✅ Date validation (future dates only)
- ✅ Rating range validation (1-5)

### 5. **Environment Configuration**
- ✅ Secrets in .env file
- ✅ Never exposed in source code
- ✅ Production-ready configuration

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "User" // Optional, default: "User"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "60d5ec49c1234567890abcd1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "_id": "60d5ec49c1234567890abcd1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "bookings": [...]
  }
}
```

---

### Property Routes (`/api/properties`)

#### Get All Properties (Public)
```
GET /api/properties?page=1&limit=10

Response: 200 OK
{
  "success": true,
  "count": 10,
  "totalCount": 50,
  "page": 1,
  "pages": 5,
  "data": [...]
}
```

#### Get Property by ID (Public)
```
GET /api/properties/:id

Response: 200 OK
{
  "success": true,
  "data": { ... }
}
```

#### Create Property (Authenticated)
```
POST /api/properties
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Luxury 4 BHK Apartment",
  "description": "Beautiful apartment with modern amenities",
  "price": 5000000,
  "propertyType": "Apartment",
  "location": {
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "owner": "60d5ec49c1234567890abcd1",
  "status": "Available"
}

Response: 201 Created
```

#### Update Property (Owner or Admin)
```
PUT /api/properties/:id
Authorization: Bearer <token>

Request body: Same as create (any field)
Response: 200 OK
```

#### Delete Property (Owner or Admin)
```
DELETE /api/properties/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

### Booking Routes (`/api/bookings`)

#### Create Booking (Authenticated)
```
POST /api/bookings
Authorization: Bearer <token>

{
  "property": "60d5ec49c1234567890abcd1",
  "user": "60d5ec49c1234567890abcd2",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "message": "Interested in this property",
  "visitDate": "2026-03-15T10:00:00Z"
}

Response: 201 Created
```

#### Get Bookings (Authenticated)
```
GET /api/bookings?status=Pending&page=1&limit=10
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "count": 5,
  "totalCount": 15,
  "data": [...]
}
```

#### Approve Booking (Admin Only)
```
PATCH /api/bookings/:id/approve
Authorization: Bearer <token>

Response: 200 OK
```

#### Reject Booking (Admin Only)
```
PATCH /api/bookings/:id/reject
Authorization: Bearer <token>

Response: 200 OK
```

---

### Review Routes (`/api/reviews`)

#### Create Review (Authenticated)
```
POST /api/reviews
Authorization: Bearer <token>

{
  "property": "60d5ec49c1234567890abcd1",
  "user": "60d5ec49c1234567890abcd2",
  "rating": 5,
  "comment": "Great property, very satisfied!"
}

Response: 201 Created
```

#### Get All Reviews (Public)
```
GET /api/reviews?property=60d5ec49c1234567890abcd1&page=1&limit=5

Response: 200 OK
{
  "success": true,
  "count": 3,
  "totalCount": 12,
  "averageRating": "4.5",
  "data": [...]
}
```

#### Get Reviews by Property (Public)
```
GET /api/reviews/property/:propertyId?limit=5

Response: 200 OK
```

#### Update Review (Owner or Admin)
```
PUT /api/reviews/:id
Authorization: Bearer <token>

Request body: { "rating": 4, "comment": "Updated review" }
Response: 200 OK
```

#### Delete Review (Owner or Admin)
```
DELETE /api/reviews/:id
Authorization: Bearer <token>

Response: 200 OK
```

---

### User Routes (`/api/users`)

#### Get All Users (Admin Only)
```
GET /api/users?role=User&page=1&limit=10
Authorization: Bearer <token>

Response: 200 OK
```

#### Get User by ID
```
GET /api/users/:id
Authorization: Bearer <token>

Response: 200 OK
```

#### Update User (Self or Admin)
```
PUT /api/users/:id
Authorization: Bearer <token>

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}

Response: 200 OK
```

#### Change Password
```
PUT /api/users/:id/change-password
Authorization: Bearer <token>

{
  "oldPassword": "OldPassword123",
  "newPassword": "NewPassword456"
}

Response: 200 OK
```

#### Delete User (Admin Only)
```
DELETE /api/users/:id
Authorization: Bearer <token>

Response: 200 OK
```

---

### Settings Routes (`/api/settings`)

#### Get Settings (Public)
```
GET /api/settings

Response: 200 OK
{
  "success": true,
  "data": {
    "siteName": "Real Estate Hub",
    "contactEmail": "info@realestate.com",
    "maintenanceMode": false
  }
}
```

#### Update Settings (Admin Only)
```
PUT /api/settings
Authorization: Bearer <token>

{
  "siteName": "New Site Name",
  "contactEmail": "newemail@example.com",
  "maintenanceMode": false
}

Response: 200 OK
```

---

### Search Routes

#### Search Properties (Public)
```
GET /api/search?propertyType=Apartment&city=Mumbai&minPrice=1000000&maxPrice=5000000&page=1&limit=12
```

---

## 🗂️ Folder Structure

### Backend
```
Backend1/
├── models/              # Database schemas
│   ├── UserSchema.js
│   ├── RealEstateSchema.js
│   ├── BookingInquirySchema.js
│   ├── ReviewRatingSchema.js
│   └── SystemSettingSchema.js
├── controllers/         # Business logic
│   ├── autoControllers.js
│   ├── realEstateControllers.js
│   ├── reviewControllers.js
│   ├── userControllers.js
│   └── settingControllers.js
├── routes/             # API routes
│   ├── authRoute.js
│   ├── realEstateRoute.js
│   ├── bookingRoute.js
│   ├── reviewRoute.js
│   ├── userRoute.js
│   └── settingRoute.js
├── middleware/         # Custom middleware
│   ├── verifyToken.js
│   └── verifyRole.js
├── Validator/          # Input validation
│   ├── bodyvalidator.js
│   └── validatemiddle.js
├── .env               # Environment variables
├── index.js           # Main server file
└── package.json
```

### Frontend
```
Frontend/
├── src/
│   ├── services/
│   │   └── api.js           # API service
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state management
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── PropertyList.jsx
│   │   ├── PropertyDetails.jsx
│   │   ├── CreateProperty.jsx
│   │   ├── UserProfile.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── NotFound.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── BookingForm.jsx
│   │   └── ReviewSection.jsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── Navbar.css
│   │   ├── Auth.css
│   │   ├── PropertyCard.css
│   │   ├── PropertyDetails.css
│   │   ├── CreateProperty.css
│   │   ├── UserProfile.css
│   │   ├── AdminDashboard.css
│   │   ├── BookingForm.css
│   │   ├── ReviewSection.css
│   │   ├── Footer.css
│   │   └── NotFound.css
│   ├── App.jsx
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

---

## 📝 Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: Enum["Admin", "User", "Agent"] (default: "User"),
  timestamps: true
}
```

### Real Estate Schema
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  propertyType: Enum["House", "Apartment", "Villa", "Plot"],
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  owner: ObjectId (ref: User),
  status: Enum["Available", "Sold", "Pending"],
  timestamps: true,
  indexes: { price: 1, "location.city": 1 }
}
```

### Booking Inquiry Schema
```javascript
{
  property: ObjectId (ref: RealEstate),
  user: ObjectId (ref: User),
  fullName: String,
  email: String,
  phone: String,
  message: String,
  visitDate: Date,
  status: Enum["Pending", "Approved", "Rejected"],
  notes: String,
  timestamps: true
}
```

### Review/Rating Schema
```javascript
{
  property: ObjectId (ref: RealEstate),
  user: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  timestamps: true
}
```

### System Settings Schema
```javascript
{
  siteName: String,
  contactEmail: String,
  maintenanceMode: Boolean,
  timestamps: true
}
```

---

## 🔑 Environment Variables

Create `.env` file in Backend1 folder:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/MernStack
JWT_SECRET=your-super-secret-key-change-in-production-2024-realEstate
JWT_EXPIRE=24h
PORT=3000
NODE_ENV=development
```

---

## ✨ Features Implemented

### User Management
- ✅ User registration with password hashing
- ✅ Secure login with JWT
- ✅ Profile management
- ✅ Password change functionality
- ✅ Role-based access control (Admin/User/Agent)

### Property Management
- ✅ Create, read, update, delete properties
- ✅ Property search and filtering
- ✅ Price range filtering
- ✅ Location-based search
- ✅ Pagination support
- ✅ Property type categorization

### Booking System
- ✅ Create booking inquiries
- ✅ View booking status
- ✅ Admin approval/rejection
- ✅ Prevent duplicate bookings

### Review & Rating System
- ✅ Add reviews with ratings (1-5)
- ✅ View reviews by property
- ✅ Calculate average rating
- ✅ Edit/delete own reviews
- ✅ Prevent duplicate reviews

### Admin Dashboard
- ✅ Manage all bookings
- ✅ Manage all users
- ✅ Manage all properties
- ✅ System settings management
- ✅ Approve/reject bookings

### Security
- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ Environment variable protection
- ✅ Bearer token format validation

---

## 🧪 Testing the API

### Using Postman or similar tool:

1. **Register a user**
   - POST: `http://localhost:3000/api/auth/register`
   - Body: Name, email, password

2. **Login**
   - POST: `http://localhost:3000/api/auth/login`
   - Copy the token from response

3. **Set Authorization Header**
   - Header: `Authorization: Bearer <token>`

4. **Create a property**
   - POST: `http://localhost:3000/api/properties`
   - Add property details

5. **Book a property**
   - POST: `http://localhost:3000/api/bookings`
   - Add booking details

6. **Add a review**
   - POST: `http://localhost:3000/api/reviews`
   - Add rating and comment

---

## 🎯 Next Steps

1. **Add image upload** - Store property images
2. **Add email notifications** - Notify users of booking status
3. **Add payment integration** - Process payments
4. **Add advanced search** - Filter by more criteria
5. **Add user ratings** - Rate users on the platform
6. **Add messaging** - Direct messaging between users
7. **Add favorites** - Save favorite properties
8. **Add notifications** - Real-time notifications
9. **Deploy** - to production (Heroku, AWS, etc.)
10. **Add CI/CD** - Automated testing and deployment

---

## 📞 Support & Documentation

For any issues or questions, refer to:
- Backend Code: Well-commented controllers and routes
- Frontend Components: React component documentation
- API Tests: Use Postman collection for testing

---

**Happy coding! 🚀**
