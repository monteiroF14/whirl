import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export const GetVisibilityQuizServicePropsSchema = z.object({
	id: z.number(),
});

type GetVisibilityQuizServiceProps = z.infer<typeof GetVisibilityQuizServicePropsSchema>;

export async function getVisibility({ id }: GetVisibilityQuizServiceProps): Promise<Result<Quiz>> {
	GetVisibilityQuizServicePropsSchema.parse({ id });

	try {
		const quizVisibility = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				visibility: true,
			},
		});

		if (!quizVisibility) {
			return Result.fail(`Visibility not found for quiz with ID: ${id}`);
		}

		// @ts-expect-error make this work
		return Result.ok(quizVisibility);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to fetch quiz: ${err}`);
		}
	}
}
