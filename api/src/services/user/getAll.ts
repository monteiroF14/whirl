import { type User } from "@prisma/client";
import { database } from "config";
import { DatabaseError } from "utils/response/errors";

export async function getAll(): Promise<User[] | DatabaseError> {
	try {
		const users = await database.user.findMany();
		return users;
	} catch (error) {
		throw new DatabaseError(`Failed to retrieve users: ${error}`, "DB_ERROR");
	}
}
