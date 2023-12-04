import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { Quiz } from "../../../utils/zod/QuizSchema";

export const AddFollowerServicePropsSchema = z.object({
	quizId: z.number(),
	userId: z.number(),
});

type AddFollowerServiceProps = z.infer<typeof AddFollowerServicePropsSchema>;

export async function addFollower({
	quizId,
	userId,
}: AddFollowerServiceProps): Promise<Result<Quiz>> {
	AddFollowerServicePropsSchema.parse({ quizId, userId });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id: quizId,
			},
			include: {
				followed_by: true,
				questions: true,
			},
		});

		const user = await database.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!quiz || !user) {
			return Result.fail(`Quiz or User not found with ID: ${quizId} or ${userId}`);
		}

		const isFollowing = quiz.followed_by.some((follower) => follower.id === userId);

		if (isFollowing) {
			return Result.fail(`User with ID ${userId} is already following the quiz`);
		}

		const updatedQuiz = await database.quiz.update({
			where: {
				id: quizId,
			},
			data: {
				followed_by: {
					connect: {
						id: userId,
					},
				},
			},
			include: {
				followed_by: true,
				questions: true,
				user_rating: true,
			},
		});

		// TODO: go further into this:
		return Result.ok(updatedQuiz as Quiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to follow quiz: ${err}`);
		}
	}
}
