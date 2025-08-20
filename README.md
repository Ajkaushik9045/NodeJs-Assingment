# 🏫 School Management API

A comprehensive Node.js API for managing school data with proximity-based sorting capabilities.

## 🚀 Features

- **Add Schools**: Create new schools with name, address, and coordinates
- **Proximity Sorting**: Get schools sorted by distance from user location
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Data Validation**: Comprehensive input validation and error handling
- **Geographic Calculations**: Accurate distance calculations using Haversine formula

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Modules**: ES Modules (ESM)
- **Validation**: Built-in validation with custom error handling

## 📁 Project Structure

```
src/
├── Controller/
│   └── school.controller.js    # HTTP request/response handling
├── DB/
│   └── database.js            # Database connection and initialization
├── Models/
│   └── school.model.js        # Data models and business logic
└── Routes/
    └── school.route.js        # API route definitions
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)

# School Management API

Node.js & Express.js API to manage school data with MySQL.

## Endpoints

### Add School

**POST** `/addSchool`
Payload:

```
{
  "name": "Example School",
  "address": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### List Schools by Proximity

**GET** `/listSchools?latitude=40.7128&longitude=-74.0060`
Returns: Sorted list of schools by distance to user location.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and update credentials
3. Create MySQL database and run `src/DB/init-db.sql`
4. Start server: `npm start`

## Postman Collection

See `School_Management_API.postman_collection.json` for examples.

### 2. List Schools by Proximity

- **GET** `/api/listSchools?latitude=40.7128&longitude=-74.0060`
- **Description**: Get schools sorted by proximity to user location
- **Query Parameters**:
  - `latitude`: User's latitude (-90 to 90)
  - `longitude`: User's longitude (-180 to 180)

### 3. Get All Schools

- **GET** `/api/schools`
- **Description**: Retrieve all schools in alphabetical order

### 4. Get School by ID

- **GET** `/api/schools/:id`
- **Description**: Retrieve a specific school by ID

### 5. Update School

- **PUT** `/api/schools/:id`
- **Description**: Update an existing school
- **Body**: Same as Add School

### 6. Delete School

- **DELETE** `/api/schools/:id`
- **Description**: Remove a school from the database

### 7. Health Check

- **GET** `/health`
- **Description**: Check if the API is running

## 🔍 Response Format

### Success Response

```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 📊 Database Schema

### Schools Table

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🧪 Testing with Postman

### Postman Collection

Import the following collection into Postman:

```json
{
  "info": {
    "name": "School Management API",
    "description": "Complete API collection for School Management System"
  },
  "item": [
    {
      "name": "Add School",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/addSchool",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Example School\",\n  \"address\": \"123 Main Street, City, State\",\n  \"latitude\": 40.7128,\n  \"longitude\": -74.0060\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        }
      }
    },
    {
      "name": "List Schools by Proximity",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/listSchools?latitude=40.7128&longitude=-74.0060"
      }
    },
    {
      "name": "Get All Schools",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/schools"
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
DB_PORT=3306
```

### Deployment Platforms

- **Heroku**: Easy deployment with add-on MySQL database
- **Railway**: Simple deployment with built-in database
- **DigitalOcean**: VPS deployment with managed MySQL
- **AWS**: EC2 with RDS MySQL

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm test`: Run tests (when implemented)

### Code Style

- ES6+ syntax
- ES Modules (import/export)
- Async/await for database operations
- Comprehensive error handling
- Input validation

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Happy Coding! 🎉**
