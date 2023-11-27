import type { Quiz } from "@prisma/client";
import { database } from "../../config";
import { Result } from "../../utils/response/result";

export async function getAll(): Promise<Result<Array<Quiz>>> {
	try {
		const allQuizzes = await database.quiz.findMany();

		if (!allQuizzes) {
			Result.fail("Failed to get all quizzes");
		}

		return Result.ok(allQuizzes);
	} catch (err) {
		return Result.fail(`Failed to retrieve quizzes: ${err}`);
	}
}
