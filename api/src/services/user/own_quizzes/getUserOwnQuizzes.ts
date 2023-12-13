import { database } from "config";
import { ZodError, z } from "zod";
import { Result } from "utils/response/result";
import type { UserOwnQuizzes } from "utils/zod/UserSchema";

export const GetUserOwnQuizzesServicePropsSchema = z.object({
	userId: z.number(),
});

type GetUserOwnQuizzesServiceProps = z.infer<typeof GetUserOwnQuizzesServicePropsSchema>;

export async function getUserOwnQuizzes({
	userId,
}: GetUserOwnQuizzesServiceProps): Promise<Result<UserOwnQuizzes>> {
	GetUserOwnQuizzesServicePropsSchema.parse({ userId });

	try {
		const userData = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				own_quizzes: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!userData?.own_quizzes) {
			return Result.fail("User not found or does not own any quizzes");
		}

		return Result.ok(userData.own_quizzes);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to get user own quizzes: ${err}`);
		}
	}
}
