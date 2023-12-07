import { type User } from "@prisma/client";
import { database } from "../../config";
import { Result } from "../../utils/response/result";

export async function getAll(): Promise<Result<Array<User>>> {
	try {
		const users = await database.user.findMany({
			include: {
				followed_quizzes: true,
				own_quizzes: true,
			},
		});

		if (!users) {
			Result.fail<Array<User>>("Failed to get users");
		}

		return Result.ok(users);
	} catch (error) {
		return Result.fail<Array<User>>(`Failed to retrieve users: ${error}`);
	}
}
