// User CRUD operations
export { getAllUsers } from "controllers/user/crud/getAllUsers";
export { createUser } from "controllers/user/crud/createUser";
export { getUserFromId } from "controllers/user/crud/getUserFromId";

// User's own quizzes
export { getUserOwnQuizzes } from "controllers/user/own_quizzes/getUserOwnQuizzes";

// User's followed quizzes
export { getUserFollowedQuizzes } from "controllers/user/followed_quizzes/getUserFollowedQuizzes";
export { addToUserFollowedQuizzes } from "controllers/user/followed_quizzes/addToUserFollowedQuizzes";
export { removeFromUserFollowedQuizzes } from "controllers/user/followed_quizzes/removeFromUserFollowedQuizzes";

// Update image for User
export { updateUserImage } from "controllers/user/image/updateUserImage";
