import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/quiz-schema";

export const AddGenreToQuizPropsSchema = z.object({
	quizId: z.number(),
	userId: z.number(),
	genre: z.string(),
});

type AddGenreToQuizProps = z.infer<typeof AddGenreToQuizPropsSchema>;

export async function addGenreToQuiz({
	quizId,
	userId,
	genre,
}: AddGenreToQuizProps): Promise<Result<Quiz>> {
	AddGenreToQuizPropsSchema.parse({ quizId, userId, genre });

	try {
		const result = await database.$transaction<Result<Quiz>>(async (tx) => {
			const quiz = await tx.quiz.findUnique({
				where: {
					id: quizId,
				},
				include: {
					genres: true,
				},
			});

			const user = await tx.user.findUnique({
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
				return Result.fail("Can't add a genre to a quiz you don't own");
			}

			const updatedQuiz = await tx.quiz.update({
				where: {
					id: quizId,
				},
				data: {
					genres: {
						connect: {
							name: genre,
						},
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

			return Result.ok(updatedQuiz);
		});

		if (result.isFailure) {
			return Result.fail(`Failed to add genre: ${result.error}`);
		}

		return Result.ok(result.value);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to add genre: ${err}`);
	}
}
