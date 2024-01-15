import { database } from "config";
import { ZodError, z } from "zod";
import { Result } from "utils/response/result";
import type { UserLikedQuizzes } from "utils/zod/user-schema";

export const GetLikedQuizzesPropsSchema = z.object({
	userId: z.number(),
});

type GetLikedQuizzesProps = z.infer<typeof GetLikedQuizzesPropsSchema>;

export async function getLikedQuizzes({
	userId,
}: GetLikedQuizzesProps): Promise<Result<UserLikedQuizzes>> {
	GetLikedQuizzesPropsSchema.parse({ userId });

	try {
		const user = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				liked_quizzes: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!user || user === null) {
			return Result.fail(`Any liked quizzes found from user: ${userId}`);
		}

		return Result.ok(user.liked_quizzes);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to get user liked quizzes: ${err}`);
		}
	}
}
