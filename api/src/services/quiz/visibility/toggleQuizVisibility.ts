import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export const ToggleQuizVisibilityServicePropsSchema = z.object({
	id: z.number(),
});

type ToggleQuizVisibilityServiceProps = z.infer<typeof ToggleQuizVisibilityServicePropsSchema>;

export async function toggleQuizVisibility({
	id,
}: ToggleQuizVisibilityServiceProps): Promise<Result<Quiz>> {
	ToggleQuizVisibilityServicePropsSchema.parse({ id });

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

		if (!updatedQuiz) {
			Result.fail("Couldn't toggle quiz visibility");
		}

		return Result.ok(updatedQuiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to toggle quiz visibility: ${err}`);
	}
}
