Employee Management System

A web-based Employee Management System built using React, Flask, and MySQL. The application allows users to manage employee records through a simple dashboard. Docker and Docker Compose are used to containerize and run the application components.

Project Overview

This project demonstrates how a frontend, backend, and database can work together using Docker containers.

Technology Stack
Frontend: React, Vite
Backend: Python, Flask, Flask-CORS
Database: MySQL 8.0
Containerization: Docker and Docker Compose
Web Server: Nginx
Features
View employee records
Add new employees
Edit existing employee details
Delete employee records
Store employee information in MySQL
Preserve database data using a Docker named volume
Run the frontend, backend, and database as separate containers
Project Structure
Employee Management - Docker/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── docker-compose.yml
├── .gitignore
└── README.md
Prerequisites

Install the following before running the project:

Docker Desktop
Git (optional, for cloning the repository)

Ensure Docker Desktop is running before executing the commands below.

Run the Project
1. Clone the repository
git clone https://github.com/Harihara-Sudharshini/employee-management-docker.git
cd employee-management-docker
2. Start the application

Build the images and start the containers:

docker compose up --build -d
3. Access the application

Once the containers are running, open:

Frontend dashboard: http://localhost:5173
Backend API: http://localhost:5000
MySQL: localhost:3306
4. Check the containers
docker compose ps
5. View application logs
docker compose logs
6. Stop the application
docker compose down

The MySQL database uses a named volume called employee_data to preserve its data when the containers are stopped and removed. Avoid using docker compose down -v if you want to keep the database data.

Docker Architecture

The application consists of three services:

Frontend: Serves the built React application using Nginx.
Backend: Runs the Flask application and provides API endpoints for employee operations.
Database: Stores employee records in MySQL.

Docker Compose manages the services and their communication.

Learning Outcomes
Understanding multi-container applications
Creating Dockerfiles for frontend and backend services
Configuring services using Docker Compose
Connecting a Flask backend to a MySQL database
Persisting database data using Docker volumes
Implementing basic CRUD operations
Author

Harihara Sudharshini S