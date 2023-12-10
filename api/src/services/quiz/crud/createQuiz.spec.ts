import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { create } from ".";
import { database } from "config/__mocks__";
import { QuizGenreSchema, QuizVisibilitySchema, type Quiz } from "utils/zod/QuizSchema";

vi.mock("config");

describe("create function", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should create a user with valid input", async () => {
		const date = new Date(2000, 1, 1, 13);
		vi.setSystemTime(date);

		const questions: Quiz["questions"] = [];

		const userId = 1;
		const newQuiz = {
			id: 1,
			name: "Quiz 1",
			url: "quiz-1",
			image_url: "https://example.com/quiz1.jpg",
			visibility: QuizVisibilitySchema.Enum.public,
			genre: [QuizGenreSchema.Enum.anime],
			created_at: date,
			rating: 0,
			views: 0,
			created_by_id: userId,
			questions: [],
			followers: [],
		};

		database.quiz.create.mockResolvedValue(newQuiz);

		const result = await create({ quiz: newQuiz, userId, questions });

		expect(result.isSuccess).toBe(true);
		expect(result.value).toStrictEqual(newQuiz);
	});
});
