import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export const ToggleVisibilityQuizServicePropsSchema = z.object({
	id: z.number(),
});

type ToggleVisibilityQuizServiceProps = z.infer<typeof ToggleVisibilityQuizServicePropsSchema>;

export async function toggleVisibility({
	id,
}: ToggleVisibilityQuizServiceProps): Promise<Result<Quiz>> {
	ToggleVisibilityQuizServicePropsSchema.parse({ id });

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

		const newVisibility = quiz.visibility === "private" ? "public" : "private";

		const updatedQuiz = await database.quiz.update({
			where: {
				id,
			},
			data: {
				visibility: newVisibility,
			},
			include: {
				followers: true,
				questions: true,
			},
		});

		// @ts-expect-error make this work
		return Result.ok(updatedQuiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to fetch quiz: ${err}`);
		}
	}
}
