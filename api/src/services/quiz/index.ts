// Quiz CRUD Operations
export { createQuiz } from "services/quiz/crud/create-quiz";
export { getAllQuizzes } from "services/quiz/crud/get-all-quizzes";
export { getQuizFromId } from "services/quiz/crud/get-quiz-from-id";
export { removeQuiz } from "services/quiz/crud/remove-quiz";

// Visibility Operations
export { getQuizVisibility } from "services/quiz/visibility/get-quiz-visibility";
export { toggleQuizVisibility } from "services/quiz/visibility/toggle-quiz-visibility";

// Views Operations
export { getQuizViews } from "services/quiz/views/get-quiz-views";
export { incrementQuizViews } from "services/quiz/views/increment-quiz-views";

// Rating Operations
export { getQuizRating } from "services/quiz/rating/get-quiz-rating";
export { updateQuizRating } from "services/quiz/rating/update-quiz-rating";

// Followers Operations
export { getQuizLikes } from "services/quiz/likes/get-quiz-likes";

// Genres Operations
export { addGenreToQuiz } from "services/quiz/genres/add-genre-to-quiz";
export { removeGenreFromQuiz } from "services/quiz/genres/remove-genre-from-quiz";

// Image Operations
export { updateQuizImage } from "services/quiz/image/update-quiz-image";
