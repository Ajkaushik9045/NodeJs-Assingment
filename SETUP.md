# 🚀 Quick Setup Guide

## ⚡ Get Started in 5 Minutes

### 1. Environment Setup
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

### 2. Database Setup
```bash
# Create MySQL database
mysql -u root -p -e "CREATE DATABASE school_management;"

# Or run the SQL script
mysql -u root -p < src/DB/init-db.sql
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the API
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 5. Test the API
```bash
# Health check
curl http://localhost:3000/health

# Add a school
curl -X POST http://localhost:3000/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test School",
    "address": "123 Test Street",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'

# List schools by proximity
curl "http://localhost:3000/api/listSchools?latitude=40.7128&longitude=-74.0060"
```

## 📱 API Endpoints

- **POST** `/api/addSchool` - Add new school
- **GET** `/api/listSchools` - Get schools by proximity
- **GET** `/api/schools` - Get all schools
- **GET** `/api/schools/:id` - Get school by ID
- **PUT** `/api/schools/:id` - Update school
- **DELETE** `/api/schools/:id` - Delete school
- **GET** `/health` - Health check

## 🧪 Postman Testing

1. Import `School_Management_API.postman_collection.json` into Postman
2. Set `baseUrl` variable to `http://localhost:3000`
3. Test all endpoints with sample data

## 🐛 Troubleshooting

- **Database connection failed**: Check MySQL service and credentials
- **Port already in use**: Change PORT in .env file
- **Module not found**: Run `npm install` again

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- Customize the API for your specific needs

---

**Your School Management API is ready! 🎉**

