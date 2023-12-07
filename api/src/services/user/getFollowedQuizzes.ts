import { type Quiz } from "@prisma/client";
import { database } from "../../config";
import { ZodError, z } from "zod";
import { Result } from "../../utils/response/result";

export const GetFollowedQuizzesUserServicePropsSchema = z.object({
	id: z.number(),
});

type GetFollowedQuizzesUserServiceProps = z.infer<typeof GetFollowedQuizzesUserServicePropsSchema>;

export async function getFollowedQuizzes({
	id,
}: GetFollowedQuizzesUserServiceProps): Promise<Result<Array<Quiz>>> {
	GetFollowedQuizzesUserServicePropsSchema.parse({ id });

	try {
		const quizzes = await database.quiz.findMany({
			where: {
				followers: {
					some: {
						id,
					},
				},
			},
		});

		if (!quizzes || quizzes === null) {
			return Result.fail<Array<Quiz>>(`Quizzes not found from user: ${id}`);
		}

		return Result.ok(quizzes);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail<Array<Quiz>>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<Array<Quiz>>(`Failed to create user: ${err}`);
		}
	}
}
