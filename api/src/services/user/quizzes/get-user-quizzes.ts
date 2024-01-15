import { database } from "config";
import { ZodError, z } from "zod";
import { Result } from "utils/response/result";
import type { UserQuizzes } from "utils/zod/user-schema";

export const GetUserQuizzesPropsSchema = z.object({
	userId: z.number(),
});

type GetUserQuizzesProps = z.infer<typeof GetUserQuizzesPropsSchema>;

export async function getUserQuizzes({
	userId,
}: GetUserQuizzesProps): Promise<Result<UserQuizzes>> {
	GetUserQuizzesPropsSchema.parse({ userId });

	try {
		const user = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				quizzes: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!user?.quizzes) {
			return Result.fail("User not found or does not own any quizzes");
		}

		return Result.ok(user.quizzes);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to get user own quizzes: ${err}`);
		}
	}
}
