// import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// import { database } from "config/__mocks__";
// import { getOwnQuizzes } from "..";
// import { QuizVisibilitySchema, QuizGenreSchema } from "utils/zod/QuizSchema";
// import { UserRoleSchema } from "utils/zod/UserSchema";

// vi.mock("config");

// describe("getOwnQuizzes", () => {
// 	beforeEach(() => {
// 		vi.useFakeTimers();
// 	});

// 	afterEach(() => {
// 		vi.useRealTimers();
// 	});

// 	it("should return all own quizzes if the user id is passed properly", async () => {
// 		const userId = 1;
// 		const date = new Date(2000, 1, 1, 13);
// 		vi.setSystemTime(date);

// 		const userData = {
// 			id: userId,
// 			name: "John Doe",
// 			image_url: "https://example.com/user.jpg",
// 			role: UserRoleSchema.Enum.APPLICATION_USER,
// 			own_quizzes: [
// 				{
// 					id: 1,
// 					name: "Quiz 1",
// 					url: "quiz-1",
// 					image_url: "https://example.com/quiz1.jpg",
// 					visibility: QuizVisibilitySchema.Enum.public,
// 					genre: [QuizGenreSchema.Enum.anime],
// 					created_at: date,
// 					rating: 0,
// 					views: 0,
// 					created_by: {
// 						id: userId,
// 						name: "John Doe",
// 						image_url: "https://example.com/user.jpg",
// 						role: UserRoleSchema.Enum.APPLICATION_USER,
// 					},
// 					questions: [],
// 					followed_by: [],
// 				},
// 			],
// 			followed_quizzes: [],
// 		};

// 		database.user.findUnique.mockResolvedValue(userData);

// 		const result = await getOwnQuizzes({ userId });

// 		expect(result.isSuccess).toBe(true);
// 		expect(result.value).toStrictEqual(userData.own_quizzes);
// 	});
// });
