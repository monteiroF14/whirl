import { describe, expect, it, vi } from "vitest";
import { database } from "../../../config/__mocks__";
import { getAll } from "..";
import { QuizVisibilitySchema, QuizGenreSchema } from "../../../utils/zod/QuizSchema";

vi.mock("../../config");

describe("getAll function", () => {
	it("should return all quizzes when the database query is successful", async () => {
		const userId = 1;
		const quizExample = {
			id: 1,
			name: "Quiz 1",
			url: "quiz-1",
			image_url: "https://example.com/quiz1.jpg",
			visibility: QuizVisibilitySchema.Enum.public,
			genre: [QuizGenreSchema.Enum.anime],
			created_at: new Date(),
			rating: 0,
			views: 0,
			created_by_id: userId,
			questions: [],
			followers: [],
		};

		database.quiz.findMany.mockResolvedValue([quizExample]);

		const result = await getAll();

		expect(result.isSuccess).toBe(true);
		expect(result.value).toStrictEqual([quizExample]);
	});
});
