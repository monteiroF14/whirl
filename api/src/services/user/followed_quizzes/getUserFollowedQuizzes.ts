import { database } from "../../../config";
import { ZodError, z } from "zod";
import { Result } from "../../../utils/response/result";
import type { UserFollowedQuizzes } from "../../../utils/zod/UserSchema";

export const GetUserFollowedQuizzesServicePropsSchema = z.object({
	userId: z.number(),
});

type GetUserFollowedQuizzesServiceProps = z.infer<typeof GetUserFollowedQuizzesServicePropsSchema>;

export async function getUserFollowedQuizzes({
	userId,
}: GetUserFollowedQuizzesServiceProps): Promise<Result<UserFollowedQuizzes>> {
	GetUserFollowedQuizzesServicePropsSchema.parse({ userId });

	try {
		const quizzes = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				followed_quizzes: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!quizzes || quizzes === null) {
			return Result.fail(`Followed quizzes not found from user: ${userId}`);
		}

		return Result.ok(quizzes.followed_quizzes);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to get user followed quizzes: ${err}`);
		}
	}
}
