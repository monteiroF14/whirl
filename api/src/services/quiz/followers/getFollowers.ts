import type { Quiz } from "@prisma/client";
import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";

export const GetFollowersQuizServicePropsSchema = z.object({
	id: z.number(),
});

type GetFollowersQuizServiceProps = z.infer<typeof GetFollowersQuizServicePropsSchema>;

export async function getFollowers({ id }: GetFollowersQuizServiceProps): Promise<Result<Quiz>> {
	GetFollowersQuizServicePropsSchema.parse({ id });

	try {
		const quizRating = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				followers: true,
			},
		});

		if (!quizRating) {
			return Result.fail(`Followers not found for quiz with ID: ${id}`);
		}

		// @ts-expect-error no idea, needs fix
		return Result.ok(quizRating);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to fetch quiz followers: ${err}`);
		}
	}
}
