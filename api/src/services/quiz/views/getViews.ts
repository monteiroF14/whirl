import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export const GetViewsQuizServicePropsSchema = z.object({
	id: z.number(),
});

type GetViewsQuizServiceProps = z.infer<typeof GetViewsQuizServicePropsSchema>;

export async function getViews({ id }: GetViewsQuizServiceProps): Promise<Result<Quiz>> {
	GetViewsQuizServicePropsSchema.parse({ id });

	try {
		const quizViews = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				views: true,
			},
		});

		if (!quizViews) {
			return Result.fail(`Visibility not found for quiz with ID: ${id}`);
		}

		// @ts-expect-error make this work
		return Result.ok(quizViews);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to fetch quiz: ${err}`);
		}
	}
}
