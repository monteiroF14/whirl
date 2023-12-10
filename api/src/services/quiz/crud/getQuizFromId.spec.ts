// import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// import { database } from "config/__mocks__";
// import { getFromId } from "..";
// import { QuizVisibilitySchema, QuizGenreSchema } from "utils/zod/QuizSchema";

// vi.mock("config");

// describe("getFromId function", () => {
// 	beforeEach(() => {
// 		vi.useFakeTimers();
// 	});

// 	afterEach(() => {
// 		vi.useRealTimers();
// 	});

// 	it("should get the quiz if the quizId is valid", async () => {
// 		const quizId = 1;
// 		const userId = 1;
// 		const date = new Date(2000, 1, 1, 13);
// 		vi.setSystemTime(date);

// 		const quizExample = {
// 			id: 1,
// 			name: "Quiz 1",
// 			url: "quiz-1",
// 			image_url: "https://example.com/quiz1.jpg",
// 			visibility: QuizVisibilitySchema.Enum.public,
// 			genre: [QuizGenreSchema.Enum.anime],
// 			created_at: date,
// 			rating: 0,
// 			views: 0,
// 			created_by_id: userId,
// 			questions: [],
// 			followers: [],
// 		};

// 		database.quiz.findUnique.mockResolvedValue(quizExample);

// 		const result = await getFromId({ quizId });

// 		expect(result.isSuccess).toBe(true);
// 		expect(result.value).toStrictEqual(quizExample);
// 	});
// });
