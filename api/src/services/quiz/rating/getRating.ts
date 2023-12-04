import type { Quiz } from "@prisma/client";
import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";

export const GetRatingQuizServicePropsSchema = z.object({
	id: z.number(),
});

type GetRatingQuizServiceProps = z.infer<typeof GetRatingQuizServicePropsSchema>;

export async function getRating({ id }: GetRatingQuizServiceProps): Promise<Result<Quiz>> {
	GetRatingQuizServicePropsSchema.parse({ id });

	try {
		const quizRating = await database.quiz.findUnique({
			where: {
				id,
			},
			select: {
				rating: true,
			},
		});

		if (!quizRating) {
			return Result.fail(`Rating not found for quiz with ID: ${id}`);
		}

		// @ts-expect-error no idea, needs fix
		return Result.ok(quizRating);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to fetch quiz rating: ${err}`);
		}
	}
}
