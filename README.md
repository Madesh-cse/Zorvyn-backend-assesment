
# Finance Data Processing and Access Control Backend

This project is a backend system built for a finance dashboard application that manages financial records, user roles, and dashboard analytics.

The system supports secure user authentication using JWT, role-based access control, financial record CRUD operations, search and pagination, and summary APIs for dashboard insights such as total income, expenses, net balance, and monthly/weekly trends.

The goal of this project is to demonstrate backend architecture, data modeling, business logic implementation, access control, and API design in a clean and maintainable way.

## Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Security:** Role-Based Access Control, Rate Limiting
- **Testing Tool:** Postman


---

## Folder Structure

src/
├── config/            # database connection and swagger setup
├── controllers/       # auth, user, record, dashboard controllers
├── middleware/        # jwt auth, role authorization, rate limiting
├── models/            # user and financial record schemas
├── routes/            # auth, user, record, dashboard routes
├── utils/             # JWT token generation and common helper methods
├── app.ts             # express app setup
├── server.ts          # application entry point

## Features

- User registration and login with JWT authentication
- Role-based access control (Viewer, Analyst, Admin)
- User management APIs (update role, status, delete)
- Financial records CRUD operations
- Search support for records
- Pagination for record listing
- Dashboard summary APIs
- Monthly and weekly trend analytics
- Rate limiting for authentication routes
- Validation and error handling


# Finance Data Processing and Access Control Backend — API Documentation

## Base URL
`http://localhost:8000/api`

## Authentication APIs

### 1. Register User
**POST** `/auth/register`

```json
{
  "name": "Madesh",
  "email": "madesh@gmail.com",
  "password": "Madesh@123",
  "role": "admin",
  "status": "active"
}
```

### 2. Login User
**POST** `/auth/login`

```json
{
  "email": "madesh@gmail.com",
  "password": "Madesh@123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

## Authorization Header
`Authorization: Bearer <JWT_TOKEN>`

## User Management APIs
- **GET** `/user/getuser`
- **PATCH** `/user/:id/role`
- **PATCH** `/user/:id/status`
- **DELETE** `/user/:id`

## Financial Records APIs
- **POST** `/record/createRecord`
- **GET** `/record/getRecord?page=1&limit=10&search=salary`
- **PATCH** `/record/:id/updateRecord`
- **DELETE** `/record/:id/deleteRecord`

Sample record body:
```json
{
  "amount": 50000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-05",
  "note": "monthly salary credited"
}
```

## Dashboard APIs
- **GET** `/dashboard/summary`


## Security Features
- JWT Authentication
- Role Based Access Control
- Rate Limiting on `/api/auth/*`

## Optional Enhancements Added
- Pagination
- Search Support
- Dashboard Analytics
- Rate Limiting
- Validation & Error Handling
