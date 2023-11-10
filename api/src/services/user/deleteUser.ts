import { database } from "@src/config";
import { type CustomError, ValidationError, DatabaseError } from "@src/utils/response/errors";

export async function deleteUser(
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
			throw new DatabaseError(`Failed to delete user: ${err.message}`);
		} else {
			throw new DatabaseError("Failed to delete user: Unknown error", "UNKNOWN_ERROR");
		}
	}
}
