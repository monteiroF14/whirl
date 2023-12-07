import type { User } from "@prisma/client";
import { ZodError, z } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";

export const AddToFollowedQuizzesUserServicePropsSchema = z.object({
	userId: z.number(),
	quizId: z.number(),
});

type AddToFollowedQuizzesUserServiceProps = z.infer<
	typeof AddToFollowedQuizzesUserServicePropsSchema
>;

export async function addToFollowedQuizzes({
	userId,
	quizId,
}: AddToFollowedQuizzesUserServiceProps): Promise<Result<User>> {
	try {
		console.log("userId", userId);
		console.log("quizId", quizId);

		AddToFollowedQuizzesUserServicePropsSchema.parse({ userId, quizId });

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
					connect: [
						{
							id: quizId,
						},
					],
				},
			},
			select: {
				id: true,
				followed_quizzes: true,
				image_url: true,
				name: true,
				own_quizzes: true,
				role: true,
				refresh_token: true,
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
