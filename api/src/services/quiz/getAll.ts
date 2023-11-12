import type { Quiz } from "@prisma/client";
import { database } from "config";
import { DatabaseError } from "utils/response/errors";

export async function getAll(): Promise<Quiz[] | DatabaseError> {
	try {
		const quizzes = await database.quiz.findMany();
		return quizzes as Quiz[];
	} catch (error) {
		throw new DatabaseError(`Failed to retrieve quizzes: ${error}`, "DB_ERROR");
	}
}
