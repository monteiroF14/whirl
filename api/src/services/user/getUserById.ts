import { type User } from "@prisma/client";
import { database } from "config";
import { type CustomError, ValidationError, DatabaseError } from "utils/response/errors";

export async function getUserById(
	id: number
): Promise<User | CustomError<ValidationError | DatabaseError>> {
	if (id === null || id === undefined) {
		throw new ValidationError("ID is required", "MISSING_ID");
	}

	try {
		const user = await database.user.findUnique({
			where: {
				id,
			},
		});

		if (user === null) {
			throw new DatabaseError(`Error while creating user: ${user}`, "ERROR_CREATING_USER");
		}

		return user;
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to fetch user: ${err.message}`);
		} else {
			throw new DatabaseError("Failed to fetch user: Unknown error", "UNKNOWN_ERROR");
		}
	}
}
