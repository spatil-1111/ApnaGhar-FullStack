# 🏠 ApnaGhar – PG / Hostel / Flat Rental System

🚀 **ApnaGhar** is a full-stack web application that helps users find PGs, hostels, flats, and rooms for rent, and allows property owners to list and manage their rental properties easily.

This project is designed as a **real-world rental platform** using modern **Java Full Stack technologies**.

---

## 🌟 Key Highlights

✔ Secure JWT Authentication  
✔ Role-based Access (User & Owner)  
✔ Property Listings with Images  
✔ Booking System with Status  
✔ Notifications Module  
✔ Reviews & Ratings  
✔ REST APIs with Swagger Documentation  

---

## 👥 User Roles & Features

### 👤 User
- Register & Login
- Browse Properties
- View Property Details
- Book Property
- View Booking Status
- Receive Notifications
- Give Reviews & Ratings

### 🏠 Owner
- Add Property
- Upload Property Images
- View Own Properties
- View Booking Requests
- Get Booking Notifications

---

## 🛠 Tech Stack

### 🔹 Backend
- Java 17
- Spring Boot 4.0.1
- Spring Security
- JWT Authentication
- Hibernate / JPA
- MySQL
- Swagger (OpenAPI)

### 🔹 Frontend
- React JS
- Axios
- React Router DOM
- CSS

### 🔹 Tools
- Eclipse (Backend)
- VS Code (Frontend)
- Postman / Swagger (API Testing)
- Git & GitHub

---

## 📂 Project Structure

✅ PASTE THIS AFTER “## 📂 Project Structure” ⬇️

ApnaGhar-FullStack
│
├── src/ → Spring Boot Backend
│ ├── controller
│ ├── service
│ ├── repository
│ ├── model
│ ├── dto
│ └── security
│
├── apnaghar-frontend/ → React Frontend
│ ├── src
│ ├── components
│ ├── services
│ └── pages
│
├── pom.xml
└── README.md


---

## ⚙️ Backend Setup Instructions

### ✅ Step 1: Create Database

```sql
CREATE DATABASE apnaghar;

✅ Step 2: Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/apnaghar
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

✅ Step 3: Run Backend

Run this file in Eclipse:

ApnaGharApplication.java


Backend URL:

http://localhost:8080


Swagger UI:

http://localhost:8080/swagger-ui.html

💻 Frontend Setup Instructions
✅ Step 1: Open frontend in VS Code

Open folder:

apnaghar-frontend

✅ Step 2: Install packages
npm install

✅ Step 3: Start frontend
npm run dev


Open in browser:

http://localhost:5173

🔐 Authentication Flow

User registers

User logs in

JWT token is generated

Token is stored in browser

Token is sent with every secured request

🚀 Future Enhancements

Online Payment Integration

Chat between Owner and User

Google Maps Location

Admin Dashboard

Cloud Deployment

👨‍💻 Developer

Sammed Patil
Java Full Stack Developer
📍 Pune, India
📧 sammedpatil010@gmail.com

🔗 https://github.com/spatil-1111

⭐ If you like this project, give it a star!


---

## ✅ STEP 3: Scroll Down → Commit Changes

Commit message:

