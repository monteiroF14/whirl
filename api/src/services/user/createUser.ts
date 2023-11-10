import { database } from "@src/config";
import { DatabaseError, ValidationError, type CustomError } from "@src/utils/response/errors";

export async function createUser(
	user: unknown
): Promise<void | CustomError<ValidationError | DatabaseError>> {
	if (!user || typeof user !== "object") {
		throw new ValidationError("User is required");
	}

	try {
		if (typeof user === "object" && "name" in user && "image_url" in user) {
			await database.user.create({
				//@ts-expect-error db schema not updated yet
				data: {
					...user,
					name: user.name as string,
					image_url: user.image_url as string,
				},
			});
		} else {
			throw new DatabaseError("Invalid user data");
		}
	} catch (err: unknown) {
		if (err instanceof DatabaseError && err.message) {
			throw new DatabaseError(`Failed to create user: ${err.message}`);
		}
	}
}
