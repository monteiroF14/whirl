import type { User } from "@prisma/client";
import { z, ZodError } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";

export const RemoveFromFollowedQuizzesUserServicePropsSchema = z.object({
	userId: z.number(),
	quizId: z.number(),
});

type RemoveFromFollowedQuizzesUserServiceProps = z.infer<
	typeof RemoveFromFollowedQuizzesUserServicePropsSchema
>;

export async function removeFromFollowedQuizzes({
	userId,
	quizId,
}: RemoveFromFollowedQuizzesUserServiceProps): Promise<Result<User>> {
	try {
		RemoveFromFollowedQuizzesUserServicePropsSchema.parse({ userId, quizId });

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
					disconnect: [{ id: quizId }],
				},
			},
		});

		return Result.ok(updatedRecord);
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail<User>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<User>(`Failed to create user: ${err}`);
		}
	}
}
