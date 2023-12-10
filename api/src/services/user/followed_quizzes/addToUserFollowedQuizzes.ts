import { ZodError, z } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";

export const AddToUserFollowedQuizzesServicePropsSchema = z.object({
	userId: z.number(),
	quizId: z.number(),
});

type AddToUserFollowedQuizzesServiceProps = z.infer<
	typeof AddToUserFollowedQuizzesServicePropsSchema
>;

export async function addToUserFollowedQuizzes({
	userId,
	quizId,
}: AddToUserFollowedQuizzesServiceProps): Promise<Result<void>> {
	try {
		AddToUserFollowedQuizzesServicePropsSchema.parse({ userId, quizId });

		const result = await database.$transaction(async (tx) => {
			// Add the quiz to the user's followed quizzes
			const updatedUser = await tx.user.update({
				where: {
					id: userId,
				},
				data: {
					followed_quizzes: {
						connect: [{ id: quizId }],
					},
				},
				include: {
					followed_quizzes: true,
					own_quizzes: true,
					user_rating: true,
				},
			});

			// Add the user as a follower to the quiz
			const updatedQuiz = await tx.quiz.update({
				where: {
					id: quizId,
				},
				data: {
					followers: {
						connect: [{ id: userId }],
					},
				},
				include: {
					followers: true,
					questions: true,
					user_rating: true,
					genres: true,
				},
			});

			return { user: updatedUser, quiz: updatedQuiz };
		});

		if (!result) {
			return Result.fail("Failed to follow quiz}");
		}

		// ? should return the updated data here?
		return Result.ok();
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to follow quiz: ${err}`);
		}
	}
}
