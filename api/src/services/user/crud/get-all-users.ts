import { database } from "config";
import { Result } from "utils/response/result";
import type { User } from "utils/zod/user-schema";

export async function getAllUsers(): Promise<Result<Array<User>>> {
	try {
		const users = await database.user.findMany({
			include: {
				liked_quizzes: {
					select: {
						id: true,
					},
				},
				followers: {
					select: {
						followerId: true,
					},
				},
				following: {
					select: {
						followingId: true,
					},
				},
				quizzes: {
					select: {
						id: true,
					},
				},
				ratings: true,
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
