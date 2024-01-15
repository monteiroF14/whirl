import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { QuizLikes } from "utils/zod/quiz-schema";

export const GetQuizLikesPropsSchema = z.object({
	id: z.number(),
});

type GetQuizLikesProps = z.infer<typeof GetQuizLikesPropsSchema>;

export async function getQuizLikes({ id }: GetQuizLikesProps): Promise<Result<QuizLikes>> {
	GetQuizLikesPropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				liked_by: true,
				likes: true,
			},
		});

		if (!quiz) {
			return Result.fail(`likes not found for quiz with ID: ${id}`);
		}

		return Result.ok(quiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to get quiz likes: ${err}`);
	}
}
