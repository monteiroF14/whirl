import { database } from "@src/config";
import { type CustomError, ValidationError, DatabaseError } from "@src/utils/response/errors";

export async function deleteQuiz(
	id: number
): Promise<void | CustomError<ValidationError | DatabaseError>> {
	if (id === null || id === undefined) {
		throw new ValidationError("ID is required", "MISSING_ID");
	}

	try {
		await database.quiz.delete({
			where: {
				id,
			},
		});
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to delete quiz: ${err.message}`);
		} else {
			throw new DatabaseError("Failed to delete quiz: Unknown error", "UNKNOWN_ERROR");
		}
	}
}
