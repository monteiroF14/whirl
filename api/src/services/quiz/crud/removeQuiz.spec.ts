// import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// import { database } from "config/__mocks__";
// import { remove } from "..";
// import { QuizVisibilitySchema, QuizGenreSchema } from "utils/zod/QuizSchema";
// import { UserRoleSchema } from "utils/zod/UserSchema";

// vi.mock("config");

// describe("delete quiz by id", () => {
// 	beforeEach(() => {
// 		vi.useFakeTimers();
// 	});

// 	afterEach(() => {
// 		vi.useRealTimers();
// 	});

// 	it("should delete quiz successfully", async () => {
// 		const date = new Date(2000, 1, 1, 13);
// 		const userId = 1;
// 		const quizId = 1;
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
// 			created_by: {
// 				id: userId,
// 				name: "John Doe",
// 				image_url: "https://example.com/user.jpg",
// 				role: UserRoleSchema.Enum.APPLICATION_USER,
// 				own_quizzes: [],
// 				followed_quizzes: [],
// 			},
// 			questions: [],
// 			followers: [],
// 		};

// 		database.quiz.delete.mockResolvedValue(quizExample);

// 		const result = await remove({ quizId });

// 		expect(database.quiz.delete).toHaveBeenCalledWith({
// 			where: {
// 				id: quizId,
// 			},
// 		});

// 		expect(result.isSuccess).toBe(true);
// 	});
// });
