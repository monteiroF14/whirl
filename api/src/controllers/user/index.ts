// User CRUD operations
export { getAllUsers } from "controllers/user/crud/get-all-users";
export { createUser } from "controllers/user/crud/create-user";
export { getUserFromId } from "controllers/user/crud/get-user-from-id";

// User's own quizzes
export { getUserOwnQuizzes } from "controllers/user/quizzes/get-user-quizzes";

// User's followed quizzes
export { getUserFollowedQuizzes } from "controllers/user/likes/get-liked-quizzes";
export { addToUserFollowedQuizzes } from "controllers/user/likes/like-a-quiz";
export { removeFromUserFollowedQuizzes } from "controllers/user/likes/remove-quiz-like";

// Update image for User
export { updateUserImage } from "controllers/user/image/update-user-image";
