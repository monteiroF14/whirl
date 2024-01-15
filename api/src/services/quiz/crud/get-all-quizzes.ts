import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/quiz-schema";

export async function getAllQuizzes(): Promise<Result<Array<Quiz>>> {
	try {
		const allQuizzes = await database.quiz.findMany({
			include: {
				liked_by: {
					select: {
						id: true,
					},
				},
				genres: true,
				questions: {
					include: {
						answers: true,
					},
				},
				ratings: true,
			},
		});

		if (!allQuizzes) {
			Result.fail("Failed to get all quizzes");
		}

		return Result.ok(allQuizzes);
	} catch (err) {
		return Result.fail(`Failed to retrieve quizzes: ${err}`);
	}
}
