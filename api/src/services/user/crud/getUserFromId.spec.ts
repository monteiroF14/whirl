import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { database } from "config/__mocks__";
import { QuizGenre, UserRole, Visibility } from "@prisma/client";
import { getFromId } from "..";

vi.mock("config");

describe("getFromId function", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should get all records if the userId is valid", async () => {
		const userId = 1;
		const date = new Date(2000, 1, 1, 13);
		vi.setSystemTime(date);

		const quizExample = {
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
		};

		database.user.findUnique.mockResolvedValue({
			id: 1,
			name: "John Doe",
			role: UserRole.APPLICATION_USER,
			image_url: "https://example.com/user1.jpg",
			// @ts-expect-error prisma type error, find fix
			followed_quizzes: [],
			own_quizzes: [quizExample],
		});

		const result = await getFromId({ userId });

		expect(result.isSuccess).toBe(true);
		expect(result.value).toStrictEqual({
			id: 1,
			name: "John Doe",
			role: UserRole.APPLICATION_USER,
			image_url: "https://example.com/user1.jpg",
			followed_quizzes: [],
			own_quizzes: [quizExample],
		});
	});
});
