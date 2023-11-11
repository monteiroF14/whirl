import type { User } from "@prisma/client";
import { database } from "config";
import { DatabaseError, ValidationError, type CustomError } from "utils/response/errors";

export async function createUser(
	user: User
): Promise<void | CustomError<ValidationError | DatabaseError>> {
	if (!user || typeof user !== "object") {
		throw new ValidationError("User is required");
	}

	try {
		await database.user.create({
			data: {
				...user,
			},
		});
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to create user: ${err.message}`);
		}
	}
}
