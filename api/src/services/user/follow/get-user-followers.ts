import { database } from "config";
import { Result } from "utils/response/result";
import type { UserFollowers } from "utils/zod/user-schema";

import { ZodError, z } from "zod";

export const GetUserFollowersPropsSchema = z.object({
	userId: z.number(),
});

type GetUserFollowersProps = z.infer<typeof GetUserFollowersPropsSchema>;

export async function getUserFollowers({
	userId,
}: GetUserFollowersProps): Promise<Result<UserFollowers>> {
	try {
		const users = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				followers: {
					select: {
						followerId: true,
					},
				},
			},
		});

		if (!users || users === null) {
			return Result.fail(`followed by users query failed: ${users}`);
		}

		return Result.ok(users.followers);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to get user followed quizzes: ${err}`);
		}
	}
}
