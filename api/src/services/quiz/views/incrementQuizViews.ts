import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/QuizSchema";

export const IncrementQuizViewsServicePropsSchema = z.object({
	id: z.number(),
});

type IncrementQuizViewsServiceProps = z.infer<typeof IncrementQuizViewsServicePropsSchema>;

export async function incrementQuizViews({
	id,
}: IncrementQuizViewsServiceProps): Promise<Result<Quiz>> {
	IncrementQuizViewsServicePropsSchema.parse({ id });

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
				followers: {
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
				user_rating: true,
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
