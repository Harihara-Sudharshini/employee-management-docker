# Employee Management System

A web-based Employee Management System built using **React, Flask, and MySQL**. The application allows users to manage employee records through a simple dashboard.

The project demonstrates containerization using **Docker and Docker Compose** and application deployment using **Kubernetes with Minikube**.

## Project Overview

This project demonstrates how a frontend, backend, and database can work together using Docker containers and how the application can be deployed and managed using Kubernetes.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Python, Flask, Flask-CORS |
| Database | MySQL 8.0 |
| Web Server | Nginx |
| Containerization | Docker |
| Container Orchestration | Docker Compose |
| Deployment | Kubernetes |
| Local Kubernetes Cluster | Minikube |
| Version Control | Git and GitHub |

## Features

- View employee records.
- Add new employees.
- Edit existing employee details.
- Delete employee records.
- Store employee information in MySQL.
- Preserve database data using Docker named volumes.
- Run frontend, backend, and database as separate containers.
- Deploy application components using Kubernetes Deployments.
- Expose application components using Kubernetes Services.

## Project Structure

```text
Employee Management - Docker/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── src/
│   └── vercel.json
│
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mysql-deployment.yaml
│   ├── mysql-pvc.yaml
│   ├── mysql-service.yaml
│   └── secret.yaml (local configuration; not committed)
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Prerequisites

Install the following tools:

- Docker Desktop
- Git
- kubectl
- Minikube

Ensure Docker Desktop is running before executing Docker commands.

## Running the Application Using Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/Harihara-Sudharshini/employee-management-docker.git
cd employee-management-docker
```

### 2. Build and Start the Containers

```bash
docker compose up --build -d
```

### 3. Access the Application

Open the frontend in your browser:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

MySQL:

```text
localhost:3306
```

### 4. Check Running Containers

```bash
docker compose ps
```

### 5. View Application Logs

```bash
docker compose logs
```

### 6. Stop the Application

```bash
docker compose down
```

The MySQL database uses a named volume called `employee_data` to preserve data when containers are stopped and removed.

Avoid using `docker compose down -v` if you want to retain database data.

## Docker Hub Images

The project uses the following Docker images:

| Component | Docker Hub Image |
|---|---|
| Frontend | `sudharshh/employee-management-frontend:v1` |
| Backend | `sudharshh/employee-management-backend:v1` |

Docker Hub: https://hub.docker.com/u/sudharshh

## Kubernetes Deployment Using Minikube

The application components are configured for deployment using Kubernetes YAML files.

### 1. Start Minikube

```bash
minikube start
```

### 2. Check Kubernetes Cluster

```bash
kubectl get nodes
```

### 3. Apply Kubernetes Configurations

Apply the required database configuration and secret first. The local `secret.yaml` must be created with the required database credentials.

Then apply the application configurations:

```bash
kubectl apply -f k8s/
```

### 4. Check Deployments

```bash
kubectl get deployments
```

### 5. Check Pods

```bash
kubectl get pods
```

### 6. Check Services

```bash
kubectl get services
```

### 7. Access the Frontend

Find the frontend NodePort:

```bash
kubectl get services
```

Get the Minikube IP:

```bash
minikube ip
```

Use the Minikube IP and frontend NodePort in your browser:

```text
http://<MINIKUBE-IP>:<NODE-PORT>
```

## Docker Architecture

The application consists of three main services:

- **Frontend:** Serves the built React application using Nginx.
- **Backend:** Runs the Flask application and provides API endpoints for employee operations.
- **Database:** Stores employee records in MySQL.

Docker Compose manages the containers and their communication.

## Kubernetes Architecture

Kubernetes manages the application components through:

- **Deployments:** Manage frontend, backend, and MySQL Pods.
- **Services:** Enable communication between application components.
- **Persistent Volume Claim:** Provides persistent storage for MySQL.
- **Secrets:** Store database credentials separately from public source code.
- **Minikube:** Provides a local Kubernetes environment for deployment and testing.

## Learning Outcomes

- Understanding multi-container applications.
- Creating Dockerfiles for frontend and backend services.
- Configuring services using Docker Compose.
- Connecting a Flask backend to a MySQL database.
- Persisting database data using Docker volumes.
- Implementing CRUD operations.
- Building and publishing Docker images.
- Creating Kubernetes Deployment and Service YAML files.
- Deploying applications using Minikube.
- Understanding Kubernetes Pods, Services, Deployments, and Persistent Volumes.

## Author

**Harihara Sudharshini S**
