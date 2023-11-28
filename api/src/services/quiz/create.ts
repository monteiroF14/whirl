import { ZodError, z } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";
import type { Quiz } from "@prisma/client";
import { QuizSchema } from "../../utils/zod/QuizSchema";

export const CreateQuizServicePropsSchema = z.object({
	quiz: QuizSchema,
	userId: z.number(),
});

type CreateQuizServiceProps = z.infer<typeof CreateQuizServicePropsSchema>;

export async function create({ quiz, userId }: CreateQuizServiceProps): Promise<Result<Quiz>> {
	CreateQuizServicePropsSchema.parse({ quiz, userId });

	try {
		const newQuiz = await database.quiz.create({
			data: {
				...quiz,
				created_by_id: userId,
				followed_by: {
					create: [],
				},
				questions: {
					create: quiz.questions,
				},
			},
			include: {
				followed_by: true,
				questions: true,
			},
		});

		if (!newQuiz) {
			return Result.fail("Failed to create a new quiz");
		}

		return Result.ok(newQuiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to create quiz: ${err}`);
		}
	}
}
