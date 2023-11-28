import type { User } from "@prisma/client";
import { ZodError, z } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";

export const AttachToUserQuizServicePropsSchema = z.object({
	userId: z.number(),
	quizId: z.number(),
});

type AttachToUserQuizServiceProps = z.infer<typeof AttachToUserQuizServicePropsSchema>;

export async function attachToUser({
	userId,
	quizId,
}: AttachToUserQuizServiceProps): Promise<Result<User>> {
	try {
		AttachToUserQuizServicePropsSchema.parse({ userId, quizId });

		const existingRecord = await database.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				own_quizzes: true,
			},
		});

		if (!existingRecord) {
			return Result.fail(`Failed to get own quizzes for user with id: ${userId}`);
		}

		const updatedRecord = await database.user.update({
			where: {
				id: userId,
			},
			data: {
				own_quizzes: {
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
