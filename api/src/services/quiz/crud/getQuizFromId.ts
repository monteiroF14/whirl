import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/QuizSchema";

export const GetQuizFromIdServicePropsSchema = z.object({
	id: z.number(),
});

type GetQuizFromIdServiceProps = z.infer<typeof GetQuizFromIdServicePropsSchema>;

export async function getQuizFromId({ id }: GetQuizFromIdServiceProps): Promise<Result<Quiz>> {
	GetQuizFromIdServicePropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			include: {
				followers: {
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
				user_rating: true,
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
