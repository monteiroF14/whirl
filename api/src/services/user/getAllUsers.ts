import { type User } from "@prisma/client";
import { database } from "@src/config";
import { DatabaseError } from "@src/utils/response/errors";

export async function getAllUsers(): Promise<User[] | DatabaseError> {
	try {
		const users = await database.user.findMany();
		return users;
	} catch (error) {
		throw new DatabaseError(`Failed to retrieve users: ${error}`, "DB_ERROR");
	}
}
