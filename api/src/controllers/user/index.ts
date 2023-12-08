// User CRUD operations
export { getAllUsers } from "./crud/getAllUsers";
export { createUser } from "./crud/createUser";
export { getUserFromId } from "./crud/getUserFromId";

// User's own quizzes
export { getUserOwnQuizzes } from "./own_quizzes/getUserOwnQuizzes";

// User's followed quizzes
export { getUserFollowedQuizzes } from "./followed_quizzes/getUserFollowedQuizzes";
export { addToUserFollowedQuizzes } from "./followed_quizzes/addToUserFollowedQuizzes";
export { removeFromUserFollowedQuizzes } from "./followed_quizzes/removeFromUserFollowedQuizzes";

// Update image for User
export { updateUserImage } from "./image/updateUserImage";
