import { type Quiz } from "@prisma/client";
import { database } from "../../config";
import { ZodError, z } from "zod";
import { Result } from "../../utils/response/result";

export const GetOwnQuizzesUserServicePropsSchema = z.object({
	userId: z.number(),
});

type GetOwnQuizzesUserServiceProps = z.infer<typeof GetOwnQuizzesUserServicePropsSchema>;

export async function getOwnQuizzes({
	userId,
}: GetOwnQuizzesUserServiceProps): Promise<Result<Array<Quiz>>> {
	GetOwnQuizzesUserServicePropsSchema.parse({ userId });

	try {
		const userData = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				own_quizzes: true,
			},
		});

		if (!userData?.own_quizzes) {
			return Result.fail<Array<Quiz>>("User not found or does not own any quizzes");
		}

		return Result.ok(userData.own_quizzes);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail<Array<Quiz>>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<Array<Quiz>>(`Failed to get user own quizzes: ${err}`);
		}
	}
}
