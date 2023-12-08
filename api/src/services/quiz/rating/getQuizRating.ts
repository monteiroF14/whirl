import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { QuizRating } from "../../../utils/zod/QuizSchema";

export const GetQuizRatingServicePropsSchema = z.object({
	id: z.number(),
});

type GetQuizRatingServiceProps = z.infer<typeof GetQuizRatingServicePropsSchema>;

export async function getQuizRating({
	id,
}: GetQuizRatingServiceProps): Promise<Result<QuizRating>> {
	GetQuizRatingServicePropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				rating: true,
			},
		});

		if (!quiz) {
			return Result.fail(`Rating not found for quiz with ID: ${id}`);
		}

		return Result.ok(quiz.rating);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to get quiz rating: ${err}`);
	}
}
