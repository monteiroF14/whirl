import { database } from "config";
import { Result } from "utils/response/result";
import type { UserFollowing } from "utils/zod/user-schema";
import { ZodError, z } from "zod";

export const GetUserFollowingPropsSchema = z.object({
	userId: z.number(),
});

type GetUserFollowingProps = z.infer<typeof GetUserFollowingPropsSchema>;

export async function getUserFollowing({
	userId,
}: GetUserFollowingProps): Promise<Result<UserFollowing>> {
	try {
		const users = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				following: {
					select: {
						followerId: true,
					},
				},
			},
		});

		if (!users || users === null) {
			return Result.fail(`following users query failed: ${users}`);
		}

		return Result.ok(users.following);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to get user followed quizzes: ${err}`);
		}
	}
}
