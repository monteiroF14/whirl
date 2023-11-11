import { type Quiz } from "@prisma/client";
import { database } from "config";
import { type CustomError, ValidationError, DatabaseError } from "utils/response/errors";

export async function getUserFollowedQuizzes(
	id: number
): Promise<Quiz[] | CustomError<ValidationError | DatabaseError>> {
	if (id === null || id === undefined) {
		throw new ValidationError("ID is required", "MISSING_ID");
	}

	try {
		const user = await database.user.findUnique({
			where: { id },
			include: {
				followed_quizzes: true,
			},
		});

		if (user === null) {
			throw new DatabaseError(
				`Error while getting user followed quizzes: ${user}`,
				"ERROR_GETTING_USER_FOLLOWED_QUIZZES"
			);
		}

		return user.followed_quizzes;
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to get user followed quizzes: ${err.message}`);
		} else {
			throw new DatabaseError(
				"Failed to get user followed quizzes: Unknown error",
				"UNKNOWN_ERROR"
			);
		}
	}
}
