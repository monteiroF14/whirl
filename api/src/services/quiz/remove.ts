import { z, ZodError } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";
import type { Quiz } from "@prisma/client";

export const RemoveQuizServicePropsSchema = z.object({
	quizId: z.number(),
});

type RemoveQuizServiceProps = z.infer<typeof RemoveQuizServicePropsSchema>;

export async function remove({ quizId }: RemoveQuizServiceProps): Promise<Result<Quiz>> {
	RemoveQuizServicePropsSchema.parse({ quizId });

	try {
		const quiz = await database.quiz.delete({
			where: {
				id: quizId,
			},
		});

		if (!quiz) {
			return Result.fail<Quiz>("Failed to delete quiz, i'm not on catch");
		}

		return Result.ok();
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail<Quiz>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<Quiz>(`Failed to remove quiz: ${err}`);
		}
	}
}
