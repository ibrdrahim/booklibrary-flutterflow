# Backend API Documentation

This repository contains the backend API for the Book Library application.

## Features

- **Authentication:** Secure endpoints with Firebase Authentication.
- **Authorization:** Limit data access based on the authenticated user.
- **Database:** Utilize Firestore as the database for storing book-related data.
- **Endpoints:** Implement CRUD (Create, Read, Update, Delete) operations for books.
- **Pagination:** Support pagination for listing books.
- **Filters:** Allow filtering books based on author, year, and genre.
- **Postman Collection:** Provided a Postman collection for testing endpoints.
- **Environment Variables:** Included a Postman environment file for managing environment variables.

## Technologies Used

- **Node.js:** Backend server framework.
- **Express.js:** Web framework for Node.js.
- **Firebase Admin SDK:** Manage Firebase services programmatically.
- **Firestore:** Flexible, scalable database for mobile, web, and server development.
- **Postman:** API development environment for testing and documentation.

## Installation and Setup

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up environment variables:
   - Create a `.env` file based on the provided `.env.example`.
   - Fill in the required environment variables, including Firebase configuration.
4. Start the server using `npm start`.

## Usage

- Make requests to the provided API endpoints using tools like Postman.
- Ensure to include proper authentication headers for authorized access.

## Endpoints

- **GET /books:** Retrieve all books with optional pagination and filters.
- **GET /books/:id:** Retrieve a specific book by ID.
- **POST /books:** Create a new book.
- **PATCH /books/:id:** Update a book by ID.
- **DELETE /books/:id:** Delete a book by ID.

## Testing

- Use the provided Postman collection to test API endpoints.
- Import the Postman collection and environment file located in the `postman` folder.
- Update the environment variables in Postman if necessary.

## License

This project is licensed under the [MIT License](LICENSE).
