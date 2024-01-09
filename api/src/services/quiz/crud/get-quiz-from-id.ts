import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/quiz-schema";

export const GetQuizFromIdPropsSchema = z.object({
	id: z.number(),
});

type GetQuizFromIdProps = z.infer<typeof GetQuizFromIdPropsSchema>;

export async function getQuizFromId({ id }: GetQuizFromIdProps): Promise<Result<Quiz>> {
	GetQuizFromIdPropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			include: {
				liked_by: {
					select: {
						id: true,
					},
				},
				genres: true,
				questions: {
					include: {
						answers: true,
					},
				},
				ratings: true,
			},
		});

		if (!quiz) {
			return Result.fail(`User not found for ID: ${id}`);
		}

		return Result.ok(quiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to fetch quiz: ${err}`);
	}
}
