import type { Quiz } from "@prisma/client";
import { database } from "config";
import { type CustomError, ValidationError, DatabaseError } from "utils/response/errors";

export async function getFromId(
	id: number
): Promise<Quiz | CustomError<ValidationError | DatabaseError>> {
	if (id === null || id === undefined) {
		throw new ValidationError("ID is required", "MISSING_ID");
	}

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
		});

		if (quiz === null) {
			throw new DatabaseError(`Error while creating quiz: ${quiz}`, "ERROR_CREATING_QUIZ");
		}

		return quiz;
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to fetch user: ${err.message}`);
		} else {
			throw new DatabaseError("Failed to fetch user: Unknown error", "UNKNOWN_ERROR");
		}
	}
}
