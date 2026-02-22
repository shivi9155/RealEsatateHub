# 🚀 Quick Start & Troubleshooting Guide

## 📦 Installation & Running

### Step 1: Install Backend Dependencies

```bash
cd Backend1
npm install
```

**Expected packages installed**:
- express ^5.2.1
- mongoose ^9.2.1
- jsonwebtoken ^9.0.3
- bcryptjs ^2.4.3
- express-validator ^7.3.1
- dotenv ^16.4.5

### Step 2: Verify .env File

```bash
# Check if Backend1/.env exists
# It should contain:
MONGODB_URI=mongodb://127.0.0.1:27017/MernStack
JWT_SECRET=your-super-secret-key-change-in-production-2024-realEstate
JWT_EXPIRE=24h
PORT=3000
NODE_ENV=development
```

### Step 3: Start Backend

```bash
cd Backend1
npm start
```

**Expected output**:
```
✅ DB Connected
🚀 Server Running on Port 3000
```

### Step 4: Install Frontend Dependencies (New Terminal)

```bash
cd Frontend
npm install
```

### Step 5: Start Frontend

```bash
cd Frontend
npm start
```

**Expected output**:
```
Compiled successfully!
You can now view realestate-frontend in the browser.
http://localhost:3000
```

---

## 🔍 Common Issues & Solutions

### Issue 1: "MongoDB Connection Error"
**Error**: `❌ DB Connection Error: connect ECONNREFUSED`

**Solutions**:
1. Ensure MongoDB is running
   ```bash
   # For Windows (if installed as service)
   net start MongoDB
   
   # Or start MongoDB manually
   mongod
   ```

2. If using MongoDB Atlas, verify connection string
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

3. Check if port 27017 is being used
   ```bash
   netstat -an | findstr 27017
   ```

---

### Issue 2: "Port 3000 already in use"
**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:
1. Kill process on port 3000 (Windows)
   ```bash
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. Or use different port
   ```bash
   # In Backend1/.env
   PORT=3001
   ```

---

### Issue 3: "Module not found"
**Error**: `Error: Cannot find module 'bcryptjs'`

**Solution**:
```bash
# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

---

### Issue 4: "Frontend can't connect to backend"
**Error**: Network error when trying to login/register

**Solutions**:
1. Ensure backend is running on http://localhost:3000

2. Check Frontend API configuration
   ```javascript
   // Frontend/src/services/api.js
   const API_URL = "http://localhost:3000/api";
   ```

3. Check CORS (add to Backend1/index.js if needed)
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

---

### Issue 5: "Login always fails"
**Error**: Invalid credentials even with correct email/password

**Solutions**:
1. Ensure password has been hashed properly
2. Check database if user exists
3. Verify password matches validation rules:
   - Minimum 6 characters
   - Contains uppercase letter
   - Contains lowercase letter
   - Contains number

**Valid test password**: `Test123`

---

### Issue 6: "Token expired"
**Error**: `Invalid or Expired Token`

**Solution**:
1. Clear localStorage
   ```javascript
   localStorage.clear()
   ```

2. Login again to get fresh token

3. Or extend JWT expiration in .env
   ```
   JWT_EXPIRE=48h
   ```

---

## 🧪 Quick Test Endpoints

### Using curl or Postman

#### 1. Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'
```

Copy the token from response.

#### 3. Get Profile (with token)
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 4. Get Properties
```bash
curl -X GET "http://localhost:3000/api/properties?page=1&limit=10"
```

---

## 📊 Test Data Setup

### Create a Test Admin User

Use Postman or curl to:
1. Register with role: Admin
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin123",
  "role": "Admin"
}
```

2. Login to get admin token

3. Use admin token for admin operations

---

## 🐛 Debug Mode

### Backend Debugging

**Enable detailed logging**:
```javascript
// Add to Backend1/index.js
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
```

**Monitor requests**:
```bash
# In terminal
npm start 2>&1 | tee debug.log
```

### Frontend Debugging

**Check Network Tab in DevTools**:
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Try login
4. Check requests and responses

**Check Console for Errors**:
1. Open Browser Console (F12)
2. Look for red error messages
3. Check localStorage with `JSON.parse(localStorage.getItem('user'))`

---

## 🔄 Common Workflow

### Test Complete User Journey

1. **Start both servers**
   ```bash
   # Terminal 1
   cd Backend1 && npm start
   
   # Terminal 2
   cd Frontend && npm start
   ```

2. **Register new user**
   - Go to http://localhost:3000 → Register
   - Fill form (use strong password like `Test123`)
   - Submit

3. **Login**
   - Go to Login page
   - Use credentials created above
   - Should redirect to home page

4. **Create property**
   - Click "Add Property" in navbar
   - Fill all required fields
   - Submit

5. **View property**
   - Search properties from home
   - Click on a property
   - Should see details, booking form, reviews

6. **Book property**
   - Fill booking form
   - Submit
   - Should see confirmation

7. **Add review**
   - Scroll to reviews section
   - Add rating and comment
   - Submit

---

## 📋 Pre-deployment Checklist

- [ ] Test all CRUD operations
- [ ] Test authentication (register, login, logout)
- [ ] Test role-based access (admin operations)
- [ ] Test search and filters
- [ ] Test validation (invalid inputs rejected)
- [ ] Test error handling
- [ ] Check console for errors
- [ ] Verify database operations
- [ ] Update .env for production
- [ ] Change JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Update API_URL for production
- [ ] Test on different browsers

---

## 🎯 Performance Tips

### Reduce Bundle Size
```bash
cd Frontend
npm run build
# Check build size
```

### Database Optimization
```
- Indexes on frequently queried fields (already added)
- Population (references resolved efficiently)
- Pagination (don't fetch all data)
```

### API Optimization
```
- Limit 10 records per page (default)
- Only return needed fields
- Cache settings and popular properties
- Use compression (Enable in production)
```

---

## 📞 Getting Help

### Check These Files
1. **API_DOCUMENTATION.md** - Complete API reference
2. **CODE_REVIEW.md** - Issues and solutions
3. **README.md** - Project overview
4. **This file** - Quick troubleshooting

### Common Questions

**Q: How do I change the database?**
A: Update `MONGODB_URI` in `.env` file

**Q: How do I add more validation?**
A: Update `/Validator/bodyvalidator.js` with express-validator rules

**Q: How do I add new routes?**
A: Create file in `/routes/` and import in `index.js`

**Q: How do I deploy?**
A: Use Heroku, AWS, or DigitalOcean for backend; Vercel/Netlify for frontend

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend starts without errors
- [ ] Frontend loads without errors
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can view user profile
- [ ] Can view properties
- [ ] Can search with filters
- [ ] Can create property (authenticated)
- [ ] Can create booking (authenticated)
- [ ] Can add review (authenticated)
- [ ] Admin dashboard loads (admin only)
- [ ] Logout works

---

**All set! Your Real Estate System is ready to use! 🎉**
