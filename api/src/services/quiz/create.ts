import { ZodError, z } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";
import type { Quiz } from "@prisma/client";
import { QuizSchema } from "../../utils/zod/QuizSchema";
import { QuestionSchema } from "../../utils/zod/QuestionSchema";

export const CreateQuizServicePropsSchema = z.object({
	quiz: QuizSchema,
	questions: z.array(QuestionSchema),
	userId: z.number(),
});

type CreateQuizServiceProps = z.infer<typeof CreateQuizServicePropsSchema>;

export async function create({
	quiz,
	userId,
	questions,
}: CreateQuizServiceProps): Promise<Result<Quiz>> {
	CreateQuizServicePropsSchema.parse({ quiz, userId, questions });

	try {
		const newQuiz = await database.quiz.create({
			data: {
				...quiz,
				created_by: {
					connect: { id: userId },
				},
				followed_by: {
					create: [],
				},
				questions: {
					create: [],
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
