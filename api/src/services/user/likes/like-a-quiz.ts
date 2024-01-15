import { ZodError, z } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";

export const LikeAQuizPropsSchema = z.object({
	userId: z.number(),
	quizId: z.number(),
});

type LikeAQuizProps = z.infer<typeof LikeAQuizPropsSchema>;

export async function likeAQuiz({ userId, quizId }: LikeAQuizProps): Promise<Result<void>> {
	try {
		LikeAQuizPropsSchema.parse({ userId, quizId });

		const result = await database.$transaction(async (tx) => {
			const updatedUser = await tx.user.update({
				where: {
					id: userId,
				},
				data: {
					liked_quizzes: {
						connect: [{ id: quizId }],
					},
				},
				include: {
					liked_quizzes: true,
					quizzes: true,
					ratings: true,
				},
			});

			const updatedQuiz = await tx.quiz.update({
				where: {
					id: quizId,
				},
				data: {
					liked_by: {
						connect: [{ id: userId }],
					},
					likes: {
						increment: 1,
					},
				},
				include: {
					liked_by: true,
					questions: true,
					ratings: true,
					genres: true,
				},
			});

			return { user: updatedUser, quiz: updatedQuiz };
		});

		if (!result) {
			return Result.fail("Failed to like a quiz}");
		}

		return Result.ok();
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to like a quiz: ${err}`);
		}
	}
}
