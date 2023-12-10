import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export const UpdateQuizRatingServicePropsSchema = z.object({
	quizId: z.number(),
	userId: z.number(),
	userRating: z.number(),
});

type UpdateQuizRatingServiceProps = z.infer<typeof UpdateQuizRatingServicePropsSchema>;

export async function updateQuizRating({
	quizId,
	userId,
	userRating,
}: UpdateQuizRatingServiceProps): Promise<Result<Quiz>> {
	UpdateQuizRatingServicePropsSchema.parse({ quizId, userId, userRating });

	try {
		await database.userRating.upsert({
			where: {
				userId_quizId: {
					userId,
					quizId,
				},
			},
			create: {
				userId,
				quizId,
				rating: userRating,
			},
			update: {
				rating: userRating,
			},
		});

		const averageRatingResult = await database.userRating.aggregate({
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
