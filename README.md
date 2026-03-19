# 📚 Course Enrollment Backend System

This project is a backend system built using **NestJS**, **TypeScript**, and **PostgreSQL** to manage student course enrollments with **timetable clash detection**.

The system allows students to enroll in courses while ensuring that no two enrolled courses overlap in time.

---

## 🛠 Tech Stack

- **Node.js** – JavaScript runtime
- **NestJS** – Backend framework
- **TypeScript** – Strongly typed JavaScript
- **PostgreSQL** – Relational database
- **TypeORM** – ORM for database interaction
- **Swagger (OpenAPI)** – API documentation & testing

---

## 🧱 Data Model Overview

The system consists of the following core entities:

- **College**
- **Student**
- **Course**
- **Timetable**
- **Enrollment**

### Key Relationships

- A **College** has many Students and Courses  
- A **Student** belongs to a College  
- A **Course** belongs to a College  
- A **Course** can have multiple Timetable slots  
- A **Student** can enroll in multiple Courses  
- Enrollment is handled via a join table (**Enrollment**)

---

## 🚦 Business Rules Implemented

- A student can enroll in multiple courses
- A course can have multiple timetable slots
- **Enrollment is blocked if ANY timetable slot clashes**
- Duplicate enrollments (same student + same course) are prevented
- Proper HTTP error handling:
  - `404 Not Found` → student or course does not exist
  - `409 Conflict` → timetable clash detected

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

Make sure you have:
- Node.js (v18+ recommended)
- PostgreSQL installed and running
- npm installed

---

### 2️⃣ Clone the Repository

```bash
git clone <repository-url>
cd backend_assign_2
