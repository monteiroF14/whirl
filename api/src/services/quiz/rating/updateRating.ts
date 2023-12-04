import type { Quiz } from "@prisma/client";
import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";

export const UpdateRatingQuizServicePropsSchema = z.object({
	quizId: z.number(),
	userId: z.number(),
	userRating: z.number(),
});

type UpdateRatingQuizServiceProps = z.infer<typeof UpdateRatingQuizServicePropsSchema>;

export async function updateRating({
	quizId,
	userId,
	userRating,
}: UpdateRatingQuizServiceProps): Promise<Result<Quiz>> {
	UpdateRatingQuizServicePropsSchema.parse({ quizId, userId, userRating });

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
				followed_by: true,
				questions: true,
			},
		});

		return Result.ok(updatedQuiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to update quiz rating: ${err}`);
		}
	}
}
