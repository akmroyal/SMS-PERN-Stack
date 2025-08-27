# 🎓 Student Management System (SMS)

A modern, full-stack **PERN** (PostgreSQL, Express.js, React, Node.js) application for managing student records with a professional dashboard interface.

![Project Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Database Setup](#-database-setup)
- [Environment Configuration](#-environment-configuration)
- [API Documentation](#-api-documentation)
- [Frontend Architecture](#-frontend-architecture)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### 🎯 Core Functionality
- **Student Management**: Add, edit, delete, and view student records
- **Real-time Search**: Search students by name or class
- **Advanced Filtering**: Filter students by class with dropdown selection
- **Dynamic Sorting**: Sort by name, class, age, or marks (ascending/descending)
- **Dashboard Analytics**: Visual overview with student statistics
- **Responsive Design**: Mobile-first UI with Tailwind CSS

### 🔧 Technical Features
- **RESTful API**: Complete CRUD operations with Express.js
- **PostgreSQL Database**: Robust data persistence
- **State Management**: Zustand for client-side state
- **Form Validation**: Client-side validation with error handling
- **Success/Error Alerts**: User-friendly notifications
- **Auto-refresh**: Real-time data updates after operations
- **Modal Interface**: Clean add/edit forms in overlay modals

### 📊 Dashboard Features
- Total student count
- Class distribution visualization
- Average marks calculation
- Interactive bar charts
- Search result counter
- Real-time metric updates

## 🛠 Tech Stack

### Backend
- **Node.js** (Runtime)
- **Express.js** (Web Framework)
- **PostgreSQL** (Database)
- **pg** (PostgreSQL Client)
- **CORS** (Cross-Origin Resource Sharing)
- **dotenv** (Environment Variables)
- **Nodemon** (Development Auto-reload)

### Frontend
- **React 19** (UI Library)
- **Vite** (Build Tool & Dev Server)
- **React Router** (Client-side Routing)
- **Tailwind CSS 4** (Styling Framework)
- **Zustand** (State Management)
- **Axios** (HTTP Client)
- **Lucide React** (Icon Library)
- **Chart.js** (Data Visualization)

## 📁 Project Structure

```
SMS-PERN-Stack/
├── 📂 server/                  # Backend API
│   ├── 📂 src/
│   │   ├── 📂 controller/      # Route controllers
│   │   │   └── students.js     # Student CRUD operations
│   │   ├── 📂 db/              # Database configuration
│   │   │   └── db.js           # PostgreSQL connection
│   │   ├── 📂 routes/          # API routes
│   │   │   └── routes.js       # Student routes
│   │   └── index.js            # Server entry point
│   ├── .env.sample             # Environment template
│   ├── .gitignore              # Git ignore rules
│   └── package.json            # Dependencies & scripts
│
├── 📂 client/                  # Frontend React App
│   ├── 📂 src/
│   │   ├── 📂 api/             # API service layer
│   │   │   └── studentsApi.js  # Student API calls
│   │   ├── 📂 components/      # Reusable UI components
│   │   │   └── ui.jsx          # Core UI primitives
│   │   ├── 📂 layout/          # Layout components
│   │   │   └── DashboardLayout.jsx # Main app layout
│   │   ├── 📂 pages/           # Route pages
│   │   │   ├── Dashboard.jsx   # Analytics dashboard
│   │   │   └── Students.jsx    # Student management
│   │   ├── 📂 store/           # State management
│   │   │   └── students.js     # Zustand store
│   │   ├── App.jsx             # Root component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── 📂 public/              # Static assets
│   ├── .env.sample             # Environment template
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   └── package.json            # Dependencies & scripts
│
└── README.md                   # Project documentation
```

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git** (for cloning)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/akmroyal/SMS-PERN-Stack.git
cd SMS-PERN-Stack
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.sample .env
# Edit .env with your database credentials
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.sample .env
# Edit .env with your backend URL
```

## 🗄 Database Setup

### 1. Create PostgreSQL Database

```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE student_management;
```

### 2. Create Students Table

```sql
-- Connect to your database and run:
CREATE TABLE students (
    st_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0),
    class VARCHAR(20) NOT NULL,
    marks INTEGER NOT NULL CHECK (marks >= 0 AND marks <= 100),
    gender VARCHAR(20) DEFAULT 'Male',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO students (name, age, class, marks, gender) VALUES
('Tommy Smith', 12, '7', 78, 'Male'),
('Lucy Brown', 17, '12', 92, 'Female'),
('Jake White', 8, '3', 65, 'Male'),
('Ella Green', 15, '10', 88, 'Female'),
('Max Jones', 10, '5', 71, 'Male');
```

## ⚙️ Environment Configuration

### Backend (.env)

```bash
PORT=3000

# PostgreSQL Database credentials
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=5432
DB_NAME=student_management
```

### Frontend (.env)

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/students` | Get all students | None |
| `GET` | `/students/:id` | Get student by ID | None |
| `POST` | `/students` | Create new student | Student Object |
| `PUT` | `/students/:id` | Update student | Student Object |
| `DELETE` | `/students/:id` | Delete student | None |

### Request/Response Examples

#### Create Student
```http
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "age": 16,
  "class": "11",
  "marks": 85,
  "gender": "Male"
}
```

#### Response
```json
{
  "message": "Student Added Successfully !!",
  "data": {
    "st_id": 6,
    "name": "John Doe",
    "age": 16,
    "class": "11",
    "marks": 85,
    "gender": "Male",
    "created_at": "2025-08-27T10:30:00.000Z",
    "updated_at": "2025-08-27T10:30:00.000Z"
  }
}
```

## 🎨 Frontend Architecture

### Component Hierarchy
```
App
├── BrowserRouter
    └── DashboardLayout (Header + Container)
        ├── Dashboard (Route: /)
        │   ├── Summary Cards
        │   └── Class Distribution Chart
        └── Students (Route: /students)
            ├── Search & Filter Bar
            ├── Statistics Cards
            ├── Students Table
            └── Add/Edit Modal
```

### State Management
- **Zustand Store**: Handles search, filter, and sort state
- **Local State**: Component-specific UI state
- **API State**: Real-time data from backend

### Key Components
- **DashboardLayout**: App shell with navigation
- **Students**: Main CRUD interface
- **Dashboard**: Analytics and overview
- **StudentForm**: Add/edit modal form
- **UI Components**: Reusable primitives (Button, Input, Modal, etc.)

## 🎯 Usage Guide

### Running the Application

1. **Start Backend Server**
```bash
cd server
npm run dev
# Server runs on http://localhost:3000
```

2. **Start Frontend Development Server**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

3. **Access Application**
   - Open browser to `http://localhost:5173`
   - Navigate between Dashboard and Students pages

### Using the Interface

#### Dashboard
- View total students, classes, and average marks
- See visual distribution of students per class
- Real-time updates when data changes

#### Students Management
- **Add Student**: Click "Add Student" button, fill form, submit
- **Search**: Type in search box to filter by name or class
- **Filter**: Use class dropdown to show specific class
- **Sort**: Click column headers to sort data
- **Edit**: Click "Edit" button on any row
- **Delete**: Click "Delete" button (with confirmation)
- **Clear**: Reset search and filters

## 🚀 Deployment

### Backend (Node.js/Express)

1. **Environment Setup**
```bash
# Production environment variables
NODE_ENV=production
PORT=3000
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_PORT=5432
DB_NAME=your_production_db_name
```

2. **Deploy Options**
   - **Heroku**: Connect GitHub repo, set environment variables
   - **Railway**: Import project, configure environment
   - **DigitalOcean**: Use App Platform or Droplets
   - **AWS**: EC2 with RDS PostgreSQL

### Frontend (React/Vite)

1. **Build for Production**
```bash
cd client
npm run build
```

2. **Deploy Options**
   - **Vercel**: Connect GitHub repo, auto-deploy on push
   - **Netlify**: Drag & drop `dist` folder or GitHub integration
   - **GitHub Pages**: Configure workflow for static deployment
   - **AWS S3**: Static website hosting with CloudFront

### Environment Variables for Production

**Backend:**
- Set database credentials for production PostgreSQL
- Configure CORS origins for your frontend domain

**Frontend:**
- Update `VITE_API_BASE_URL` to your deployed backend URL

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add proper error handling
- Update documentation for new features
- Test changes before submitting PR

## 🔧 Troubleshooting

### Common Issues

**Database Connection Errors**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify credentials in .env file
# Ensure database exists and user has permissions
```

**CORS Issues**
```javascript
// server/src/index.js
app.use(cors({
  origin: ['http://localhost:5173', 'your-frontend-domain.com']
}));
```

**Environment Variables Not Loading**
```bash
# Ensure .env files are in correct directories
# Restart servers after changing .env files
# Check .env files are not in .gitignore
```

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

### Getting Help
- Check console logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure database schema matches expected structure
- Test API endpoints independently using Postman/curl

---

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ashutosh Maurya** - [@akmroyal](https://github.com/akmroyal)

---

⭐ **Star this repository if you found it helpful!**

For questions or support, please open an issue on GitHub.