import { ZodError, z } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";

export const FollowUser = z.object({
	userId: z.number(),
	userToFollowId: z.number(),
});

type AddToUserFollowedQuizzesServiceProps = z.infer<typeof FollowUser>;

export async function followUser({
	userId,
	userToFollowId,
}: AddToUserFollowedQuizzesServiceProps): Promise<Result<void>> {
	try {
		FollowUser.parse({ userId, userToFollowId });

		const user = await database.user.update({
			where: {
				id: userId,
			},
			data: {
				followers: {
					connect: [
						{
							followerId_followingId: {
								followerId: userToFollowId,
								followingId: userId,
							},
						},
					],
				},
			},
		});

		if (!user) {
			return Result.fail("Failed to follow user");
		}

		return Result.ok();
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to follow user: ${err}`);
		}
	}
}
