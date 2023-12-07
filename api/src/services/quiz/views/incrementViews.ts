import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export const IncreaseViewsQuizServicePropsSchema = z.object({
	id: z.number(),
});

type IncreaseViewsQuizServiceProps = z.infer<typeof IncreaseViewsQuizServicePropsSchema>;

export async function incrementViews({ id }: IncreaseViewsQuizServiceProps): Promise<Result<Quiz>> {
	IncreaseViewsQuizServicePropsSchema.parse({ id });

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

		const newViews = ++quiz.views;

		const updatedViews = await database.quiz.update({
			where: {
				id,
			},
			data: {
				views: newViews,
			},
			include: {
				followers: true,
				questions: true,
			},
		});

		// @ts-expect-error make this work
		return Result.ok(updatedViews);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to fetch quiz: ${err}`);
		}
	}
}
