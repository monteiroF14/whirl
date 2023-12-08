import { ZodError, z } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { User } from "../../../utils/zod/UserSchema";

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
}: AddToUserFollowedQuizzesServiceProps): Promise<Result<User>> {
	try {
		AddToUserFollowedQuizzesServicePropsSchema.parse({ userId, quizId });

		const existingRecord = await database.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				followed_quizzes: true,
			},
		});

		if (!existingRecord) {
			return Result.fail(`Failed to get data for user with id: ${userId}`);
		}

		const updatedRecord = await database.user.update({
			where: {
				id: userId,
			},
			data: {
				followed_quizzes: {
					connect: [{ id: quizId }],
				},
			},
			include: {
				followed_quizzes: {
					select: {
						id: true,
					},
				},
				own_quizzes: {
					select: {
						id: true,
					},
				},
				user_rating: true,
			},
		});

		return Result.ok(updatedRecord);
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail<User>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<User>(`Failed to follow quiz: ${err}`);
		}
	}
}
