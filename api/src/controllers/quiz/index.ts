// Quiz CRUD Operations
export { createQuiz } from "controllers/quiz/crud/createQuiz";
export { getAllQuizzes } from "controllers/quiz/crud/getAllQuizzes";
export { getQuizFromId } from "controllers/quiz/crud/getQuizFromId";
export { removeQuiz } from "controllers/quiz/crud/removeQuiz";

// Visibility Operations
export { getQuizVisibility } from "controllers/quiz/visibility/getQuizVisibility";
export { toggleQuizVisibility } from "controllers/quiz/visibility/toggleQuizVisibility";

// Views Operations
export { getQuizViews } from "controllers/quiz/views/getQuizViews";
export { incrementQuizViews } from "controllers/quiz/views/incrementQuizViews";

// Rating Operations
export { getQuizRating } from "controllers/quiz/rating/getQuizRating";
export { updateQuizRating } from "controllers/quiz/rating/updateQuizRating";

// Followers Operations
export { getQuizFollowers } from "controllers/quiz/followers/getQuizFollowers";

// Genres Operations
export { addGenreToQuiz } from "controllers/quiz/genres/addGenreToQuiz";
export { removeGenreFromQuiz } from "controllers/quiz/genres/removeGenreFromQuiz";

// Image Operations
export { updateQuizImage } from "controllers/quiz/image/updateQuizImage";
