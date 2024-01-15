import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";

export const RemoveQuizLikePropsSchema = z.object({
	userId: z.number(),
	quizId: z.number(),
});

type RemoveQuizLikeProps = z.infer<typeof RemoveQuizLikePropsSchema>;

export async function removeQuizLike({
	userId,
	quizId,
}: RemoveQuizLikeProps): Promise<Result<void>> {
	try {
		RemoveQuizLikePropsSchema.parse({ userId, quizId });

		const existingRecord = await database.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				liked_quizzes: true,
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
				liked_quizzes: {
					disconnect: [{ id: quizId }],
				},
			},
			include: {
				liked_quizzes: {
					select: {
						id: true,
					},
				},
				quizzes: {
					select: {
						id: true,
					},
				},
				ratings: true,
			},
		});

		if (!updatedRecord) {
			return Result.fail("Failed to remove quiz like:");
		}

		return Result.ok();
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to remove quiz like: ${err}`);
		}
	}
}
