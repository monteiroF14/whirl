import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { QuizViews } from "../../../utils/zod/QuizSchema";

export const GetQuizViewsServicePropsSchema = z.object({
	id: z.number(),
});

type GetQuizViewsServiceProps = z.infer<typeof GetQuizViewsServicePropsSchema>;

export async function getQuizViews({ id }: GetQuizViewsServiceProps): Promise<Result<QuizViews>> {
	GetQuizViewsServicePropsSchema.parse({ id });

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
