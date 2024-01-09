import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { QuizViews } from "utils/zod/quiz-schema";

export const GetQuizViewsPropsSchema = z.object({
	id: z.number(),
});

type GetQuizViewsProps = z.infer<typeof GetQuizViewsPropsSchema>;

export async function getQuizViews({ id }: GetQuizViewsProps): Promise<Result<QuizViews>> {
	GetQuizViewsPropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				views: true,
			},
		});

		if (!quiz) {
			return Result.fail(`Views not found for quiz with ID: ${id}`);
		}

		return Result.ok(quiz.views);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to get quiz views: ${err}`);
	}
}
