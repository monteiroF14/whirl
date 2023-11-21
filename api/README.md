# <span style="color:#0054E1">**whirl**</span> - API

This is the documentation for the <span style="color:#0054E1">**whirl**</span> API, which provides endpoints for managing users and quizzes. The API is built using Node.js and Express, and it follows RESTful conventions.

## Base URL

The base URL for the API is `https://whirl-api.onrender.com`.

## Authentication

The API does not currently require authentication.

## Users

### -> Get all users

- **Endpoint:** `/users`
- **Method:** `GET`
- **Controller Method:** `UserController.getAll`
- **Description:** Retrieve a list of all users.

### -> Create a new user

- **Endpoint:** `/users`
- **Method:** `POST`
- **Controller Method:** `UserController.create`
- **Description:** Create a new user.

### -> Get user by ID

- **Endpoint:** `/users/:id`
- **Method:** `GET`
- **Controller Method:** `UserController.getFromId`
- **Description:** Retrieve a user by their ID.

### -> Delete user by ID

- **Endpoint:** `/users/:id`
- **Method:** `DELETE`
- **Controller Method:** `UserController.remove`
- **Description:** Delete a user by their ID.

## Quizzes

### -> Get all quizzes

- **Endpoint:** `/quizzes`
- **Method:** `GET`
- **Controller Method:** `QuizController.getAll`
- **Description:** Retrieve a list of all quizzes.

### -> Create a new quiz

- **Endpoint:** `/quizzes`
- **Method:** `POST`
- **Controller Method:** `QuizController.create`
- **Description:** Create a new quiz.

### -> Get quiz by ID

- **Endpoint:** `/quizzes/:id`
- **Method:** `GET`
- **Controller Method:** `QuizController.getFromId`
- **Description:** Retrieve a quiz by its ID.

### -> Delete quiz by ID

- **Endpoint:** `/quizzes/:id`
- **Method:** `DELETE`
- **Controller Method:** `QuizController.remove`
- **Description:** Delete a quiz by its ID.

## Server Status

### -> Check server status

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Check if the server is running.
- **Response:** Returns a "server is running" message with a status code of 200.

## Usage

You can use the provided routes to interact with the <span style="color:#0054E1">**whirl**</span> API. Ensure that you follow RESTful principles and include the necessary data in your requests.

Feel free to explore and integrate these endpoints into your application.

### Example

```bash
curl https://whirl-api.onrender.com/quizzes -X GET
```
