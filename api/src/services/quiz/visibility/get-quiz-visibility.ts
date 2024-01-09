import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { QuizVisibility } from "utils/zod/quiz-schema";

export const GetQuizVisibilityPropsSchema = z.object({
	id: z.number(),
});

type GetQuizVisibilityProps = z.infer<typeof GetQuizVisibilityPropsSchema>;

export async function getQuizVisibility({
	id,
}: GetQuizVisibilityProps): Promise<Result<QuizVisibility>> {
	GetQuizVisibilityPropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				visibility: true,
			},
		});

		if (!quiz) {
			return Result.fail(`Visibility not found for quiz with ID: ${id}`);
		}

		return Result.ok(quiz.visibility);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to get quiz visibility: ${err}`);
	}
}
