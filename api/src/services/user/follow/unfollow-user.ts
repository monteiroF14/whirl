import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";

export const UnfollowUserPropsSchema = z.object({
	userId: z.number(),
	userToUnfollowId: z.number(),
});

type UnfollowUserProps = z.infer<typeof UnfollowUserPropsSchema>;

export async function unfollowUser({
	userId,
	userToUnfollowId,
}: UnfollowUserProps): Promise<Result<void>> {
	try {
		UnfollowUserPropsSchema.parse({ userId, userToUnfollowId });

		const existingRecord = await database.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				followers: true,
			},
		});

		if (!existingRecord) {
			return Result.fail(`Failed to get data for user with id: ${userId}`);
		}

		const updatedRecord = await database.user.update({
			where: {
				id: userId,
			},
			data: {
				followers: {
					disconnect: [
						{
							followerId_followingId: {
								followerId: userToUnfollowId,
								followingId: userId,
							},
						},
					],
				},
			},
		});

		if (!updatedRecord) {
			return Result.fail("Failed to unfollow user:");
		}

		return Result.ok();
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to unfollow user: ${err}`);
		}
	}
}
