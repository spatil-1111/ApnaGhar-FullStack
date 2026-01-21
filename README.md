
# 🏠 ApnaGhar – PG / Hostel / Flat Rental Platform

**ApnaGhar** is a full-stack rental management web application that connects **tenants** looking for PGs, hostels, flats, and rooms with **property owners** who want to list and manage their properties.

It is designed as a **real-world scalable system** using modern **Java Full Stack technologies** with secure authentication and role-based access.

---

## Why ApnaGhar?

✔ Built using Industry-standard Architecture  
✔ Secure JWT Authentication  
✔ Clean REST API Design  
✔ Fully Functional Frontend & Backend Integration  
✔ Designed for Real-Life Usage  

---

##  Key Features

###  Tenant (User)
- Register & Secure Login
- Browse Available Properties
- View Property Details with Images
- Book Property
- Track Booking Status
- Receive Notifications
- Submit Reviews & Ratings

###  Property Owner
- Add & Manage Properties
- Upload Property Images
- View Booking Requests
- Track Earnings & Booking History
- Receive Booking Notifications

---

##  System Architecture

```

React Frontend  →  REST APIs  →  Spring Boot Backend  →  MySQL Database

```

- Frontend communicates using **Axios**
- Backend secured using **Spring Security + JWT**
- Data persistence using **JPA & Hibernate**

---

##  Technology Stack

###  Backend
- Java 17
- Spring Boot 4.0.1
- Spring Security
- JWT Authentication
- Hibernate / JPA
- MySQL
- Swagger (OpenAPI)

###  Frontend
- React (Vite)
- Axios
- React Router DOM
- Modular CSS

###  Tools & Platforms
- Eclipse IDE
- Visual Studio Code
- Postman & Swagger
- Git & GitHub

---

##  Project Structure

```

ApnaGhar-FullStack
│
├── src/                      → Spring Boot Backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── dto
│   ├── security
│   └── exception
│
├── apnaghar-frontend/        → React Frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── utils
│
├── pom.xml
└── README.md

````

---

##  Backend Setup Guide

###  Step 1: Create Database

```sql
CREATE DATABASE apnaghar;
````

---

###  Step 2: Configure Database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apnaghar
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

###  Step 3: Run Backend

Run in Eclipse:

```
ApnaGharApplication.java
```

Backend will start at:

```
http://localhost:8080
```

Swagger API Docs:

```
http://localhost:8080/swagger-ui.html
```

---

##  Frontend Setup Guide

###  Step 1: Open Frontend Folder

Open `apnaghar-frontend` in VS Code

---

###  Step 2: Install Dependencies

```bash
npm install
```

---

###  Step 3: Run Application

```bash
npm run dev
```

Open browser:

```
http://localhost:5173
```

---

##  Authentication Flow

1. User registers
2. User logs in
3. Backend generates JWT token
4. Token stored in browser
5. Token sent with every secured request

---

##  Future Improvements

* Online Payment Gateway
* Real-time Chat System
* Google Maps Integration
* Admin Dashboard
* Cloud Deployment (AWS / Render)

---

##  Developer

**Sammed Patil**
 Java Full Stack Developer
 Location: Pune, India

  Email: [sammedpatil010@gmail.com](mailto:sammedpatil010@gmail.com)
  GitHub: [https://github.com/spatil-1111](https://github.com/spatil-1111)

---

##  Support the Project

If you found this project helpful, please give it a ⭐ on GitHub.
It motivates me to build more real-world applications! 

```

