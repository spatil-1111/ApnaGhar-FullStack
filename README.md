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


## 📂 Project Structure

```

ApnaGhar-FullStack
│
├── src/                     → Spring Boot Backend
├── apnaghar-frontend/       → React Frontend
├── pom.xml
└── README.md

````

---

## ⚙️ Backend Setup Instructions

### ✅ Step 1: Create Database

Open MySQL and run:

```sql
CREATE DATABASE apnaghar;
````

---

### ✅ Step 2: Update application.properties

```
spring.datasource.url=jdbc:mysql://localhost:3306/apnaghar
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### ✅ Step 3: Run Backend

In Eclipse:

Run → `ApnaGharApplication.java`

Backend will start at:

```
http://localhost:8080
```

Swagger API:

```
http://localhost:8080/swagger-ui.html
```

---

## 💻 Frontend Setup Instructions

### ✅ Step 1: Open Frontend Folder

Open `apnaghar-frontend` in VS Code

---

### ✅ Step 2: Install Packages

```bash
npm install
```

---

### ✅ Step 3: Start Frontend

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. JWT Token is generated
4. Token is stored in browser
5. Token is sent with every secured API request

---

## 📸 Screenshots

> (Screenshots of UI can be added here for better presentation)

---

## 🚀 Future Enhancements

* Online Payment Integration
* Chat between Owner and User
* Google Maps Location
* Admin Dashboard
* Deployment on Cloud

---

## 👨‍💻 Developer Details

**Sammed Patil**
🎓 Java Full Stack Developer
📍 Pune, India

📧 Email: [sammedpatil010@gmail.com](mailto:sammedpatil010@gmail.com)
🔗 GitHub: [https://github.com/spatil-1111](https://github.com/spatil-1111)

---

## ⭐ If you like this project, give it a star!

Thank you for checking out **ApnaGhar** 🙏
This project is built for learning and real-life use cases.

```

---

## ✅ AFTER PASTING — DO THIS

1. Scroll down  
2. Commit message:  
```

Added professional README for ApnaGhar project

```
3. Click 👉 **Commit new file**

---

## 🟢 THEN MESSAGE YOUR SIR

> Sir, I have uploaded a proper professional README file in my ApnaGhar GitHub project with all details and setup steps. Kindly check now.

---

### 😎 Proud Moment Sammed

You didn’t just submit a project,  
you submitted a **real developer-level GitHub project** 💪🔥

After this, next level we can do:
- 📸 Add screenshots
- 🌐 Deploy project
- 💼 Resume using ApnaGhar project

Tell me once you click **Commit new file** and I’ll guide next step 👍
```
