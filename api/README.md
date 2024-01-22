<div align="center" id="short-description-and-logo">

  <!-- Logo -->
  <img src="assets/logo_1080.png" width="200px">

This is the documentation for the **[whirl API](https://whirl-api.onrender.com)** which provides endpoints for managing users and quizzes.

The API is built using Node.js and Express, and it follows RESTful conventions.

</div>

## Base URL

The base URL for the API is `https://whirl-api.onrender.com`.

## Usage

You can use the provided routes to interact with the whirl API. Ensure that you follow RESTful principles and include the necessary data in your requests.

Feel free to explore and integrate these endpoints into your application.

### Example

```bash
curl https://whirl-api.onrender.com/quizzes -X GET
```

## Server Status

<details open>
  <summary>Check server status</summary>

- Endpoint: `/`
- Method: `GET`
- Description: Check if the server is running.
- Response: Returns a "server is running" message with a status code of 200.

</details>

## Authentication

<details open>
  <summary>Login and Token Retrieval</summary>

- Endpoint: `/auth`
- Method: `GET`
- Description: Retrieve login information.

</details>

<details open>
  <summary>Token Callback</summary>

- Endpoint: `/auth/callback`
- Method: `GET`
- Description: Callback endpoint for retrieving tokens. The middleware `validateOAuthToken` is applied to validate the OAuth token before creating a new user.

</details>

<details open>
  <summary>Generate Access Token</summary>

- Endpoint: `/auth/new-token`
- Method: `GET`
- Description: Generate a new access token.

</details>

## Users

### User CRUD operations

<details open>

  <summary>Get all users</summary>

- Endpoint: `/users`
- Method: `GET`
- Description: Retrieve a list of all users.

</details>

<details open>
  <summary>Create a new user</summary>

- Endpoint: `/users`
- Method: `POST`
- Description: Create a new user.

</details>

<details open>
  <summary>Get user by ID</summary>

- Endpoint: `/users/:id`
- Method: `GET`
- Description: Retrieve a user by their ID.

</details>

<details open>
  <summary>Delete user by ID</summary>

- Endpoint: `/users/:id`
- Method: `DELETE`
- Description: Delete a user by their ID.

</details>

### User's quizzes

<details open>
  <summary>Get user's quizzes</summary>

- Endpoint: `/users/:id/quizzes`
- Method: `GET`
- Description: Get the quizzes owned by a user by their ID.

</details>

### Update image for User

<details open>
  <summary>Update user image by ID</summary>

- Endpoint: `/users/:id/image`
- Method: `PUT`
- Description: Update the image of a user by their ID.
- Authorization: Requires the user to be authenticated.

</details>

### User's liked quizzes

<details open>
  <summary>Get user's liked quizzes</summary>

- Endpoint: `/users/:id/liked`
- Method: `GET`
- Description: Get the quizzes liked by a user by their ID.
- Authorization: Requires the user to be authenticated as a super admin.

</details>

<details open>
  <summary>Like a quiz</summary>

- Endpoint: `/users/:id/liked`
- Method: `POST`
- Description: Add a quiz to the list of quizzes liked by a user by their ID.

</details>

<details open>
  <summary>Remove a like from a quiz</summary>

- Endpoint: `/users/:id/liked`
- Method: `DELETE`
- Description: Remove a like from a quiz by user ID.

</details>

### User's follow users

<details open>
  <summary>Get user's followed users</summary>

- Endpoint: `/users/:id/followed`
- Method: `GET`
- Description: Get the users that follow a user by his ID.
- Authorization: Requires the user to be authenticated as a super admin.

</details>

<details open>
  <summary>Get user's following users</summary>

- Endpoint: `/users/:id/following`
- Method: `GET`
- Description: Get the users that a user follows based on the user ID.

</details>

<details open>
  <summary>Follow a user</summary>

- Endpoint: `/users/:id/following`
- Method: `POST`
- Description: Follow a user.

</details>

<details open>
  <summary>Unfollow a user</summary>

- Endpoint: `/users/:id/followed`
- Method: `DELETE`
- Description: Unfollow a user.

</details>

## Quizzes

### Quiz CRUD Operations

<details open>
  <summary>Get all quizzes</summary>

- Endpoint: `/quizzes`
- Method: `GET`
- Description: Retrieve a list of all quizzes.

</details>

<details open>
  <summary>Create a new quiz</summary>

- Endpoint: `/quizzes`
- Method: `POST`
- Description: Create a new quiz.

</details>

<details open>
  <summary>Get quiz by ID</summary>

- Endpoint: `/quizzes/:id`
- Method: `GET`
- Description: Retrieve a quiz by its ID.

</details>

<details open>
  <summary>Delete quiz by ID</summary>

- Endpoint: `/quizzes/:id`
- Method: `DELETE`
- Description: Delete a quiz by its ID.

</details>

### Visibility Operations

<details open>
  <summary>Get quiz visibility</summary>

- Endpoint: `/quizzes/:id/visibility`
- Method: `GET`
- Description: Retrieve the visibility of a quiz by its ID.

</details>

<details open>
  <summary>Toggle quiz visibility</summary>

- Endpoint: `/quizzes/:id/visibility`
- Method: `PUT`
- Description: Toggle the visibility of a quiz by its ID.
- Authorization: Requires the user to be authenticated.

</details>

### Views Operations

<details open>
  <summary>Get quiz views</summary>

- Endpoint: `/quizzes/:id/views`
- Method: `GET`
- Description: Retrieve the views of a quiz by its ID.

</details>

<details open>
  <summary>Increment quiz views</summary>

- Endpoint: `/quizzes/:id/views`
- Method: `PUT`
- Description: Increment the views of a quiz by its ID.
- Authorization: Requires the user to be authenticated.

</details>

### Rating Operations

<details open>
  <summary>Get quiz rating</summary>

- Endpoint: `/quizzes/:id/rating`
- Method: `GET`
- Description: Retrieve the rating of a quiz by its ID.

</details>

<details open>
  <summary>Update quiz rating</summary>

- Endpoint: `/quizzes/:id/rating`
- Method: `PUT`
- Description: Update the rating of a quiz by its ID.
- Authorization: Requires the user to be authenticated.

</details>

### Likes Operations

<details open>
  <summary>Get quiz likes and who liked</summary>

- Endpoint: `/quizzes/:id/likes`
- Method: `GET`
- Description: Retrieve the likes and liked_by of a quiz by its ID.

</details>

### Genres Operations

<details open>
  <summary>Add genre to quiz</summary>

- Endpoint: `/quizzes/:id/genres`
- Method: `POST`
- Description: Add a genre to a quiz by its ID.
- Authorization: Requires the user to be authenticated.

</details>

<details open>
  <summary>Remove genre from quiz</summary>

- Endpoint: `/quizzes/:id/genres/:genreId`
- Method: `DELETE`
- Description: Remove a genre from a quiz by its ID and the genre ID.
- Authorization: Requires the user to be authenticated.

</details>

### Image Operations

<details open>
  <summary>Update quiz image</summary>

- Endpoint: `/quizzes/:id/image`
- Method: `PUT`
- Description: Update the image of a quiz by its ID.
- Authorization: Requires the user to be authenticated, and own the quiz.

</details>

## Genres

### Genre CRUD operations

<details open>
  <summary>Create a new genre</summary>

- Endpoint: `/genres`
- Method: `POST`
- Description: Create a new genre for quizzes.

</details>

<details open>
  <summary>Get all genres</summary>

- Endpoint: `/genres`
- Method: `GET`
- Description: Retrieve a list of all genres.

</details>

<details open>
  <summary>Delete genre by ID</summary>

- Endpoint: `/genres/:id`
- Method: `DELETE`
- Description: Delete a genre by its ID.

</details>

### Genre's image

<details open>
  <summary>Update genre by ID</summary>

- Endpoint: `/genres/:id`
- Method: `PUT`
- Description: Update the name of a genre by its ID.

</details>
