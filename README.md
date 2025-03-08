#  CultureConnect: AI-Powered Cultural & Tourism Platform (Backend)

Welcome to **CultureConnect-Server**! 🎉  
This repository contains the backend API for the **CultureConnect** platform, managing user data, tourist destinations, and AI-based features.

---

## 🚀 Technologies Used
- **Node.js** – JavaScript runtime for server-side development
- **Express.js** – Backend framework for building REST APIs
- **Prisma ORM** – Efficient database management
- **PostgreSQL** – Relational database
- **JWT (JSON Web Token)** – User authentication and authorization
- **Middleware** – Used for authentication and API security

---

## 📂 Folder Structure
```
server/
│-- controllers/          # Handles business logic for each feature
│   │-- authController.js      # User authentication (Login, Register)
│   │-- dashboardController.js # Main data for the dashboard
│   │-- destinationController.js # Destination management
│
│-- middleware/           # Middleware for security and validation
│   │-- auth.js               # Middleware for JWT authentication
│
│-- prisma/               # Database configuration using Prisma
│   │-- migrations/         # Database migration files
│   │   │-- 20250307161813_init/               # Initial database setup
│   │   │   ├── migration.sql
│   │   │-- 20250308040925_add_token_to_user/  # Add token field to users
│   │   │   ├── migration.sql
│   │   ├── migration_lock.toml
│   │-- schema.prisma       # Prisma database schema
│
│-- routes/               # API routing
│   │-- authRoutes.js          # Authentication routes
│   │-- dashboardRoutes.js     # Dashboard routes
│   │-- destinationRoutes.js   # Destination routes
│
│-- .env                   # Environment configuration file (Add to .gitignore)
│-- .gitignore             # Ignore unnecessary files in Git
│-- index.js               # Main entry point of the application
│-- package.json           # Dependencies and npm scripts
│-- package-lock.json      # Dependency lock file
```

---

## 📥 How to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/CultureConnect-team/CultureConnect-Server.git
```

### 2️⃣ Install Dependencies
Navigate to the server directory and run:
```sh
cd CultureConnect-Server
npm install
```

### 3️⃣ Configure the Database
- Ensure **PostgreSQL** is installed.
- Create a `.env` file with the following content:
  ```
  DATABASE_URL=postgresql://username:password@localhost:5432/database_name
  JWT_SECRET=your-secret-key
  ```
- Run the Prisma migration to set up the database:
  ```sh
  npx prisma migrate dev --name init
  ```

### 4️⃣ Start the Server
```sh
npm run dev
```
The server will be running at **http://localhost:5000** (or the configured port).

---

## 🛠 API Routes
Here are the available endpoints:

### 🔑 **Authentication (Auth)**
| METHOD | ENDPOINT         | DESCRIPTION |
|--------|-----------------|-------------|
| POST   | /auth/register  | Register a new user |
| POST   | /auth/login     | User login (returns JWT) |

### 📊 **Dashboard**
| METHOD | ENDPOINT         | DESCRIPTION |
|--------|-----------------|-------------|
| GET    | /dashboard      | Get dashboard data |

### 🏝 **Destinations**
| METHOD | ENDPOINT                | DESCRIPTION |
|--------|------------------------|-------------|
| GET    | /destinations          | Retrieve all destinations |
| GET    | /destinations/:id      | Retrieve destination by ID |
| POST   | /destinations          | Add a new destination |
| PUT    | /destinations/:id      | Update destination details |
| DELETE | /destinations/:id      | Delete a destination |

---

## 🤝 Contributing
We welcome contributions! Follow these steps:
1. **Fork** this repository.
2. **Create a new branch** (`feature/your-feature-name`).
3. **Make changes** and commit with a clear message.
4. **Push** to your branch and create a **Pull Request (PR)**.

> Please follow coding standards and commit conventions.

---

## 🛠 Troubleshooting
If you encounter issues:
- Ensure **Node.js** and **npm** are installed (`node -v` & `npm -v`).
- Check your database connection in the `.env` file.
- If you face dependency errors, try removing and reinstalling:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- Restart the server using `npm run dev`.

---

## 📌 License
This project is licensed under the **MIT License** – see the [`LICENSE`](LICENSE) file for details.

---

🚀 **Happy coding!** 💡✨
