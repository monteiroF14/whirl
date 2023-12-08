import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export async function getAllQuizzes(): Promise<Result<Array<Quiz>>> {
	try {
		const allQuizzes = await database.quiz.findMany({
			include: {
				followers: {
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
				user_rating: true,
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
