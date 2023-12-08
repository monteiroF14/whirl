// Quiz CRUD Operations
export { createQuiz } from "./crud/createQuiz";
export { getAllQuizzes } from "./crud/getAllQuizzes";
export { getQuizFromId } from "./crud/getQuizFromId";
export { removeQuiz } from "./crud/removeQuiz";

// Visibility Operations
export { getQuizVisibility } from "./visibility/getQuizVisibility";
export { toggleQuizVisibility } from "./visibility/toggleQuizVisibility";

// Views Operations
export { getQuizViews } from "./views/getQuizViews";
export { incrementQuizViews } from "./views/incrementQuizViews";

// Rating Operations
export { getQuizRating } from "./rating/getQuizRating";
export { updateQuizRating } from "./rating/updateQuizRating";

// Followers Operations
export { getQuizFollowers } from "./followers/getQuizFollowers";

// Genres Operations
export { addGenreToQuiz } from "./genres/addGenreToQuiz";
export { removeGenreFromQuiz } from "./genres/removeGenreFromQuiz";

// Image Operations
export { updateQuizImage } from "./image/updateQuizImage";
