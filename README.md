# RealEstateHub

RealEstateHub is a full-stack real estate web application for browsing, searching, and managing property listings.

It includes:

- a React frontend with responsive UI, 3D card interactions, animations, and dark/light mode
- a Node.js + Express backend
- MongoDB for data storage
- authentication, bookings, reviews, admin flows, and property management

## Tech Stack

### Frontend

- React 18
- React Router
- Axios
- Framer Motion
- React Icons
- CSS

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs

## Project Structure

```text
RealEsatateHub/
├─ Backend1/
│  ├─ Controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ scripts/
│  ├─ Validator/
│  ├─ .env
│  └─ index.js
├─ Frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  ├─ services/
│  │  └─ styles/
│  └─ .env
└─ README.md
```

## Features

- user registration and login
- JWT-based authentication
- property listing and property details pages
- property search and filters
- booking and inquiry flow
- review system
- admin dashboard and protected routes
- responsive UI
- animated homepage and 3D property cards
- dark/light mode toggle
- image fallback handling to avoid broken visuals

## Prerequisites

Make sure you have these installed:

- Node.js 18+ recommended
- npm
- MongoDB running locally

## Environment Setup

### Backend

The backend uses `Backend1/.env`.

Current example values:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/MernStack
JWT_SECRET=your-super-secret-key-change-in-production-2024-realEstate
JWT_EXPIRE=24h
PORT=3000
NODE_ENV=development
```

### Frontend

The frontend uses `Frontend/.env`.

```env
PORT=3001
REACT_APP_API_URL=http://localhost:3000/api
```

## Installation

### 1. Install backend dependencies

```bash
cd Backend1
npm install
```

### 2. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

## Running the Project

You need to run backend and frontend separately.

### Start backend

```bash
cd Backend1
npm start
```

Backend runs on:

```text
http://localhost:3000
```

### Start frontend

Open a new terminal:

```bash
cd Frontend
npm start
```

Frontend runs on:

```text
http://localhost:3001
```

## Build Frontend

```bash
cd Frontend
npm run build
```

## API Base URL

The frontend is configured to call:

```text
http://localhost:3000/api
```

This is controlled by:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

## Main Routes

### Public routes

- `/`
- `/properties`
- `/properties/:id`
- `/login`
- `/register`
- `/about`
- `/contact`

### Protected routes

- `/profile`
- `/my-bookings`
- `/manage-listings`
- `/property/create`

### Admin route

- `/admin`

## Recent UI Improvements

- redesigned animated homepage
- 3D property cards with hover and flip effects
- safer image loading with fallback visuals
- dark/light mode support
- upgraded navbar with mobile menu
- improved footer and static pages
- more polished auth pages

## Notes

- the frontend build currently succeeds
- some non-blocking ESLint warnings still exist in a few older pages such as admin, profile, and property details
- the app expects MongoDB to be available locally unless you change `MONGODB_URI`

## Troubleshooting

### Frontend cannot reach backend

Check:

- backend is running on port `3000`
- frontend `.env` contains `REACT_APP_API_URL=http://localhost:3000/api`

### Port conflict

This project uses:

- backend: `3000`
- frontend: `3001`

### MongoDB connection issue

Make sure MongoDB is running locally and the `MONGODB_URI` in `Backend1/.env` is correct.

## License

This project is currently unlicensed unless you add a license file.
