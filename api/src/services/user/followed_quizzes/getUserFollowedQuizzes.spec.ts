import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { database } from "../../config/__mocks__";
import { type Quiz, Visibility, QuizGenre } from "@prisma/client";
import { getFollowedQuizzes } from ".";

vi.mock("../../config");

describe("getFollowedQuizzes", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should return all followed quizzes when the user id is passed successfully", async () => {
		const userId = 1;
		const date = new Date(2000, 1, 1, 13);
		vi.setSystemTime(date);
		const followedQuizzesMock = [
			{
				id: 1,
				name: "Quiz 1",
				url: "quiz-1",
				image_url: "https://example.com/quiz1.jpg",
				visibility: Visibility.public,
				genre: [QuizGenre.anime, QuizGenre.geography],
				views: 100,
				rating: 4.5,
				created_by_id: userId,
				created_at: date,
			} as Quiz,
		] as Quiz[];

		database.quiz.findMany.mockResolvedValue(followedQuizzesMock);

		const result = await getFollowedQuizzes({ userId });

		expect(result.isSuccess).toBe(true);
		expect(result.value).toStrictEqual([
			{
				id: 1,
				name: "Quiz 1",
				url: "quiz-1",
				image_url: "https://example.com/quiz1.jpg",
				visibility: Visibility.public,
				genre: [QuizGenre.anime, QuizGenre.geography],
				views: 100,
				rating: 4.5,
				created_by_id: userId,
				created_at: date,
			},
		]);
	});
});
