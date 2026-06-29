# Blog Platform

A full-stack blog platform built using the MERN stack where users can register, log in, create blog posts, edit or delete their own posts, and interact through comments. This project demonstrates user authentication, RESTful APIs, MongoDB integration, and responsive frontend development.

---

## Live Demo

### Frontend

**https://blog-platform-web-frontend.vercel.app**

### Backend API

**https://blog-backend-5cmt.onrender.com**

---

## Features

* User Registration
* User Login with JWT Authentication
* Create Blog Posts
* Edit Blog Posts
* Delete Blog Posts
* View All Blog Posts
* View Individual Blog Details
* Comment System
* Responsive User Interface
* MongoDB Atlas Database Integration
* RESTful API Architecture

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* CORS
* dotenv

---

## Project Structure

```
blog-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/ashmika2103/blog-platform-web.git
```

### Backend Setup

```bash
cd blog-platform/backend

npm install

npm start
```

### Frontend Setup

```bash
cd blog-platform/frontend

npm install

npm start
```

---

## API Endpoints

### User

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /api/users/register |
| POST   | /api/users/login    |

### Posts

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/posts     |
| GET    | /api/posts/:id |
| POST   | /api/posts     |
| PUT    | /api/posts/:id |
| DELETE | /api/posts/:id |

### Comments

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/comments         |
| GET    | /api/comments/:postId |

---

## Deployment

### Frontend

Vercel

https://blog-platform-web-frontend.vercel.app

### Backend

Render

https://blog-backend-5cmt.onrender.com

### Database

MongoDB Atlas

---

## Future Improvements

* User Profile Page
* Like and Share Posts
* Search Blogs
* Category-wise Blogs
* Rich Text Editor
* Image Uploads
* Dark Mode
* Pagination

---

## Author

**Ashmika K**

GitHub:
https://github.com/ashmika2103

---

## License

This project is developed for internship learning purposes.
