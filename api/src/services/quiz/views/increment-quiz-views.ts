import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/quiz-schema";

export const IncrementQuizViewsPropsSchema = z.object({
	id: z.number(),
});

type IncrementQuizViewsProps = z.infer<typeof IncrementQuizViewsPropsSchema>;

export async function incrementQuizViews({ id }: IncrementQuizViewsProps): Promise<Result<Quiz>> {
	IncrementQuizViewsPropsSchema.parse({ id });

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

		const updatedViews = await database.quiz.update({
			where: {
				id,
			},
			data: {
				views: {
					increment: 1,
				},
			},
			include: {
				liked_by: {
					select: {
						id: true,
					},
				},
				genres: true,
				questions: {
					include: {
						answers: true,
					},
				},
			},
		});

		return Result.ok(updatedViews);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to increment quiz views: ${err}`);
	}
}
