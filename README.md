# Chat Application

## Overview

The **Chat Application** is a full-stack project built using the **MERN** stack (MongoDB, Express.js, React, Node.js) for the backend and **NestJS** for backend-specific logic. The project supports real-time chat functionalities, user authentication, and CRUD operations. It utilizes **Socket.IO** for real-time communication and features an elegant front-end interface built with React.

## Features

### Backend (NestJS):
- User authentication using JWT.
- CRUD operations for user management.
- Real-time communication using **Socket.IO**.
- Integrated MongoDB for database management.
- RESTful APIs with **Swagger** documentation.
- Input validation using **class-validator**.

### Frontend (React):
- Dynamic and responsive UI with React and Styled Components.
- State management using Redux Toolkit.
- Form handling and validation with React Hook Form.
- Real-time chat integration with **Socket.IO Client**.
- Progressive Web App (PWA) support.

## Prerequisites

Ensure you have the following installed:
- Node.js (v17 or later)
- npm or yarn
- MongoDB

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/your-repository/Mern_stack_chat_application.git
cd Mern_stack_chat_application
```

### Backend Setup
1. Navigate to the `Backend_nest` folder:
   ```bash
   cd Backend_nest
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file and configure the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000
   ```
4. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the `Frontend_react` folder:
   ```bash
   cd Frontend_react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env.development` file and configure the following variables:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:3000
   ```
4. Start the frontend development server:
   ```bash
   npm run start
   ```

## Project Structure

### Backend
- **src**: Contains the core application logic.
  - **auth**: Authentication module.
  - **users**: User management module.
  - **chat**: Chat and messaging module.
  - **common**: Shared utilities and middlewares.
- **test**: Contains unit and integration tests.

### Frontend
- **src**: Contains React components and logic.
  - **components**: Reusable UI components.
  - **pages**: Application pages.
  - **redux**: Redux slices for state management.
  - **services**: API service calls.
  - **utils**: Helper functions.

## Scripts

### Backend
- **`npm run start:dev`**: Starts the server in development mode.
- **`npm run build`**: Builds the application for production.
- **`npm run test`**: Runs all tests.
- **`npm run lint`**: Lints the source files.

### Frontend
- **`npm run start`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run test`**: Runs all tests.
- **`npm run prettier`**: Formats the codebase.

## Deployment

1. Build the backend:
   ```bash
   npm run build
   ```
2. Build the frontend:
   ```bash
   npm run build
   ```
3. Serve the frontend using tools like **serve**:
   ```bash
   npx serve -s build
   ```

## License

This project is licensed under the UNLICENSED License.

---

Authored by **Khushi Rudani**

