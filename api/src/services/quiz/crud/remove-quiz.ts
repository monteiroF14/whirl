import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";

export const RemoveQuizPropsSchema = z.object({
	id: z.number(),
});

type RemoveQuizProps = z.infer<typeof RemoveQuizPropsSchema>;

export async function removeQuiz({ id }: RemoveQuizProps): Promise<Result<void>> {
	RemoveQuizPropsSchema.parse({ id });

	try {
		const quiz = await database.quiz.delete({
			where: {
				id,
			},
		});

		if (!quiz) {
			return Result.fail("Failed to delete quiz, i'm not on catch");
		}

		return Result.ok();
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to remove quiz: ${err}`);
	}
}
