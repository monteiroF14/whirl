// Quiz CRUD Operations
export { createQuiz } from "controllers/quiz/crud/create-quiz";
export { getAllQuizzes } from "controllers/quiz/crud/get-all-quizzes";
export { getQuizFromId } from "controllers/quiz/crud/get-quiz-from-id";
export { removeQuiz } from "controllers/quiz/crud/remove-quiz";

// Visibility Operations
export { getQuizVisibility } from "controllers/quiz/visibility/getQuizVisibility";
export { toggleQuizVisibility } from "controllers/quiz/visibility/toggleQuizVisibility";

// Views Operations
export { getQuizViews } from "controllers/quiz/views/get-quiz-views";
export { incrementQuizViews } from "controllers/quiz/views/increment-quiz-views";

// Rating Operations
export { getQuizRating } from "controllers/quiz/rating/get-quiz-rating";
export { updateQuizRating } from "controllers/quiz/rating/update-quiz-rating";

// Followers Operations
export { getQuizLikes } from "controllers/quiz/likes/get-quiz-likes";

// Genres Operations
export { addGenreToQuiz } from "controllers/quiz/genres/add-genre-to-quiz";
export { removeGenreFromQuiz } from "controllers/quiz/genres/remove-genre-from-quiz";

// Image Operations
export { updateQuizImage } from "controllers/quiz/image/update-quiz-image";
