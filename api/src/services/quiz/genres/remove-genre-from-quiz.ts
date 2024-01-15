import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";

export const RemoveGenreFromQuizServicePropsSchema = z.object({
	quizId: z.number(),
	userId: z.number(),
	genre: z.string(),
});

type RemoveGenreFromQuizServiceProps = z.infer<typeof RemoveGenreFromQuizServicePropsSchema>;

export async function removeGenreFromQuiz({
	quizId,
	userId,
	genre,
}: RemoveGenreFromQuizServiceProps): Promise<Result<void>> {
	RemoveGenreFromQuizServicePropsSchema.parse({ quizId, userId, genre });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id: quizId,
			},
			include: {
				genres: true,
				liked_by: true,
				questions: true,
			},
		});

		const user = await database.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				quizzes: true,
			},
		});

		if (!quiz || !user) {
			return Result.fail(`Quiz or User not found with ID: ${quizId} or ${userId}`);
		}

		if (!user.quizzes.includes(quiz)) {
			return Result.fail("Can't remove a genre from a quiz you don't own");
		}

		const updatedQuiz = await database.quiz.update({
			where: {
				id: quizId,
			},
			data: {
				genres: {
					disconnect: {
						name: genre,
					},
				},
			},
		});

		if (!updatedQuiz) {
			return Result.fail("Failed to remove genre");
		}

		return Result.ok();
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to remove genre: ${err}`);
	}
}
