import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/quiz-schema";

export const UpdateQuizRatingPropsSchema = z.object({
	quizId: z.number(),
	userId: z.number(),
	rating: z.number(),
});

type UpdateQuizRatingProps = z.infer<typeof UpdateQuizRatingPropsSchema>;

export async function updateQuizRating({
	quizId,
	userId,
	rating,
}: UpdateQuizRatingProps): Promise<Result<Quiz>> {
	UpdateQuizRatingPropsSchema.parse({ quizId, userId, rating });

	try {
		await database.ratings.upsert({
			where: {
				userId_quizId: {
					userId,
					quizId,
				},
			},
			create: {
				userId,
				quizId,
				rating,
			},
			update: {
				rating,
			},
		});

		const averageRatingResult = await database.ratings.aggregate({
			_avg: {
				rating: true,
			},
			where: {
				quizId,
			},
		});

		const updatedQuiz = await database.quiz.update({
			where: {
				id: quizId,
			},
			data: {
				rating:
					averageRatingResult._avg.rating !== null ? averageRatingResult._avg.rating : undefined,
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
				ratings: true,
			},
		});

		if (!updatedQuiz) {
			return Result.fail("Failed to update quiz rating");
		}

		return Result.ok(updatedQuiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to update quiz rating: ${err}`);
	}
}
