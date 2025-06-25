# Book Management API

A comprehensive **RESTful API for managing a collection of books**, including authors, genres, and user reviews. Built with **Node.js, TypeScript**, and **MongoDB**, this backend project supports secure authentication, robust data validation, and provides a solid foundation for any library or book catalog application.

Whether you're building a digital library, a personal reading tracker, or a content management system for books, this API offers:

- Secure user authentication with OAuth 2.0 (Google)
- Intuitive RESTful endpoints for all book-related data
- Categorized management of authors, genres, and user reviews
- Reliable data storage and retrieval
- Designed for modern book and library management solutions.

---

## Features

- 🚀 **RESTful** API with clear and organized endpoints
- 🔐 **Authentication** via OAuth 2.0 (Google) and JWT
- 📚 Manage books with details like title, ISBN, author, genres, and publication info
- ✍️ Handle authors and genres as separate entities
- ⭐ User reviews for books, allowing authenticated users to share feedback
- ✅ Input validation and detailed error handling
- 🛠️ Built with **Node.js**, **TypeScript**, and **MongoDB**

---

## Architecture Diagram

![Architecture Diagram](https://raw.githubusercontent.com/nmelgar/books-api-nodejs/refs/heads/main/.pnG)

## Development Environment

| Tool / Library | Purpose                            |
| -------------- | ---------------------------------- |
| Node.js        | JavaScript runtime                 |
| TypeScript     | Type safety and modern JS features |
| Express.js     | Web server and middleware          |
| MongoDB        | NoSQL database                     |
| Mongoose       | MongoDB ODM                        |
| Auth           | Secure user authentication         |
| dotenv         | Manage environment variables       |

---

## Getting Started Locally

To clone and run the project locally:

```bash
git clone https://github.com/nmelgar/books-api-nodejs
cd books-api-nodejs
npm install
npm run dev
```
