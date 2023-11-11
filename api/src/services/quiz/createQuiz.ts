import { database } from "config";
import { DatabaseError, ValidationError, type CustomError } from "utils/response/errors";

export async function createQuiz(
	quiz: unknown,
	userId: number
): Promise<void | CustomError<ValidationError | DatabaseError>> {
	if (!quiz || typeof quiz !== "object") {
		throw new ValidationError("Quiz must be valid", "INVALID_QUIZ");
	}

	if (userId === null || userId === undefined) {
		throw new ValidationError("ID is required", "MISSING_ID");
	}

	try {
		await database.quiz.create({
			//@ts-expect-error not done yet
			data: {
				...quiz,
				created_by: {
					connect: { id: userId },
				},
			},
		});
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to create user: ${err.message}`);
		}
	}
}
