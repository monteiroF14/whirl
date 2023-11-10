import type { Quiz } from "@prisma/client";
import { database } from "@src/config";
import { DatabaseError } from "@src/utils/response/errors";

export async function getAllQuizzes(): Promise<Quiz[] | DatabaseError> {
	try {
		const quizzes = await database.quiz.findMany();
		return quizzes as Quiz[];
	} catch (error) {
		throw new DatabaseError(`Failed to retrieve quizzes: ${error}`, "DB_ERROR");
	}
}
