import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { User } from "../../../utils/zod/UserSchema";

export const RemoveFromUserFollowedQuizzesServicePropsSchema = z.object({
	userId: z.number(),
	quizId: z.number(),
});

type RemoveFromUserFollowedQuizzesServiceProps = z.infer<
	typeof RemoveFromUserFollowedQuizzesServicePropsSchema
>;

export async function removeFromUserFollowedQuizzes({
	userId,
	quizId,
}: RemoveFromUserFollowedQuizzesServiceProps): Promise<Result<User>> {
	try {
		RemoveFromUserFollowedQuizzesServicePropsSchema.parse({ userId, quizId });

		const existingRecord = await database.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				followed_quizzes: true,
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
				followed_quizzes: {
					disconnect: [{ id: quizId }],
				},
			},
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

		return Result.ok(updatedRecord);
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to unfollow quiz: ${err}`);
		}
	}
}
