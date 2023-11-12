import { ValidationError, DatabaseError, type CustomError } from "utils/response/errors";
import { type Quiz } from "@prisma/client";
import { database } from "config";

export async function getOwnQuizzes(
	id: number
): Promise<Quiz[] | CustomError<ValidationError | DatabaseError>> {
	if (id === null || id === undefined) {
		throw new ValidationError("ID is required", "MISSING_ID");
	}

	try {
		const user = await database.user.findUnique({
			where: { id },
			include: {
				own_quizzes: true,
			},
		});

		if (user === null) {
			throw new DatabaseError(
				`Error while getting user own quizzes: User not found`,
				"ERROR_GETTING_USER_OWN_QUIZZES"
			);
		}

		if (user.own_quizzes === null) {
			throw new DatabaseError(
				`Error while getting user own quizzes: User's quizzes not found`,
				"ERROR_GETTING_USER_OWN_QUIZZES"
			);
		}

		return user.own_quizzes;
	} catch (err: unknown) {
		if (err instanceof DatabaseError) {
			const databaseError: DatabaseError = err;

			throw new DatabaseError(
				`Failed to get user own quizzes: ${databaseError.message}`,
				"DATABASE_ERROR"
			);
		} else {
			throw new DatabaseError("Failed to get user own quizzes: Unknown error", "UNKNOWN_ERROR");
		}
	}
}
