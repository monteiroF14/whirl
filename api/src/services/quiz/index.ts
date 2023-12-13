// Quiz CRUD Operations
export { createQuiz } from "services/quiz/crud/createQuiz";
export { getAllQuizzes } from "services/quiz/crud/getAllQuizzes";
export { getQuizFromId } from "services/quiz/crud/getQuizFromId";
export { removeQuiz } from "services/quiz/crud/removeQuiz";

// Visibility Operations
export { getQuizVisibility } from "services/quiz/visibility/getQuizVisibility";
export { toggleQuizVisibility } from "services/quiz/visibility/toggleQuizVisibility";

// Views Operations
export { getQuizViews } from "services/quiz/views/getQuizViews";
export { incrementQuizViews } from "services/quiz/views/incrementQuizViews";

// Rating Operations
export { getQuizRating } from "services/quiz/rating/getQuizRating";
export { updateQuizRating } from "services/quiz/rating/updateQuizRating";

// Followers Operations
export { getQuizFollowers } from "services/quiz/followers/getQuizFollowers";

// Genres Operations
export { addGenreToQuiz } from "services/quiz/genres/addGenreToQuiz";
export { removeGenreFromQuiz } from "services/quiz/genres/removeGenreFromQuiz";

// Image Operations
export { updateQuizImage } from "services/quiz/image/updateQuizImage";
