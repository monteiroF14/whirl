import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { QuizFollowedQuizzes } from "utils/zod/QuizSchema";

export const GetQuizFollowersServicePropsSchema = z.object({
	id: z.number(),
});

type GetQuizFollowersServiceProps = z.infer<typeof GetQuizFollowersServicePropsSchema>;

export async function getQuizFollowers({
	id,
}: GetQuizFollowersServiceProps): Promise<Result<QuizFollowedQuizzes>> {
	GetQuizFollowersServicePropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				followers: true,
			},
		});

		if (!quiz) {
			return Result.fail(`Followers not found for quiz with ID: ${id}`);
		}

		return Result.ok(quiz.followers);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to get quiz followers: ${err}`);
	}
}
