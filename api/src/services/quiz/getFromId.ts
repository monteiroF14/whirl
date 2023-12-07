import { z, ZodError } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";
import type { Quiz } from "../../utils/zod/QuizSchema";

export const GetFromIdQuizServicePropsSchema = z.object({
	id: z.number(),
});

type GetFromIdQuizServiceProps = z.infer<typeof GetFromIdQuizServicePropsSchema>;

export async function getFromId({ id }: GetFromIdQuizServiceProps): Promise<Result<Quiz>> {
	GetFromIdQuizServicePropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.findUnique({
			where: {
				id,
			},
			include: {
				followers: true,
				questions: true,
			},
		});

		if (!quiz) {
			return Result.fail(`User not found for ID: ${id}`);
		}

		// @ts-expect-error no idea
		// TODO: make this work
		return Result.ok(quiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to fetch quiz: ${err}`);
		}
	}
}
