import { database } from "config";
import { type CustomError, ValidationError, DatabaseError } from "utils/response/errors";

export async function remove(
	id: number
): Promise<void | CustomError<ValidationError | DatabaseError>> {
	if (id === null || id === undefined) {
		throw new ValidationError("ID is required", "MISSING_ID");
	}

	try {
		await database.user.delete({
			where: {
				id,
			},
		});
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to remove user: ${err.message}`);
		} else {
			throw new DatabaseError("Failed to remove user: Unknown error", "UNKNOWN_ERROR");
		}
	}
}
