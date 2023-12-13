import { database } from "config";
import { Result } from "utils/response/result";
import type { User } from "utils/zod/UserSchema";

export async function getAllUsers(): Promise<Result<Array<User>>> {
	try {
		const users = await database.user.findMany({
			include: {
				followed_quizzes: {
					select: {
						id: true,
					},
				},
				own_quizzes: {
					select: {
						id: true,
					},
				},
				user_rating: true,
			},
		});

		if (!users) {
			Result.fail("Failed to get users");
		}

		return Result.ok(users);
	} catch (error) {
		return Result.fail(`Failed to retrieve users: ${error}`);
	}
}
