import { ZodError, z } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import { QuizSchema, type Quiz } from "utils/zod/quiz-schema";
import { QuestionSchema } from "utils/zod/question-schema";

export const CreateQuizPropsSchema = z.object({
	quiz: QuizSchema,
	userId: z.number(),
});

type CreateQuizProps = z.infer<typeof CreateQuizPropsSchema>;

export async function createQuiz({ quiz, userId }: CreateQuizProps): Promise<Result<Quiz>> {
	CreateQuizPropsSchema.parse({ quiz, userId });

	quiz.questions.forEach((question) => {
		QuestionSchema.parse(question);
	});

	try {
		const result = await database.$transaction<Result<Quiz>>(async (tx) => {
			const newQuiz = await tx.quiz.create({
				data: {
					...quiz,
					genres: {
						create: quiz.genres,
					},
					questions: {
						create: quiz.questions.map((question) => ({
							description: question.description,
							answers: {
								create: question.answers,
							},
							correct_answer: question.correct_answer,
							created_at: question.created_at,
							updated_at: question.updated_at,
						})),
					},
					liked_by: {
						connect: quiz.liked_by.map((userWhoLiked) => ({
							id: userWhoLiked.id,
						})),
					},
				},
				include: {
					questions: true,
				},
			});

			if (!newQuiz) {
				return Result.fail("Failed to create a new quiz");
			}

			const questions = newQuiz.questions.map((question) => ({
				...question,
				quizId: newQuiz.id,
			}));

			const createdQuestions = await tx.question.createMany({
				data: questions,
			});

			if (!createdQuestions) {
				return Result.fail("Failed to create questions for the quiz");
			}

			const updatedQuiz = await tx.quiz.update({
				where: { id: newQuiz.id },
				data: {
					url: new URL(
						`${process.env.API_BASE_URL ?? "https://whirl-api.onrender.com"}/quizzes/${newQuiz.id}`
					).toString(),
				},
				include: {
					liked_by: true,
					genres: true,
					questions: {
						include: {
							answers: true,
						},
					},
					ratings: true,
				},
			});

			if (!updatedQuiz) {
				return Result.fail("Failed to update the quiz URL");
			}

			// Attach the quiz to the user
			const updatedUser = await tx.user.update({
				where: { id: userId },
				data: {
					quizzes: {
						connect: [{ id: newQuiz.id }],
					},
				},
			});

			if (!updatedUser) {
				return Result.fail("Failed to attach the quiz to the user");
			}

			return Result.ok(updatedQuiz);
		});

		if (result.isFailure) {
			return Result.fail(`Failed to create quiz: ${result.error}`);
		}

		return Result.ok(result.value);
	} catch (err) {
		if (err instanceof Error && "code" in err && "message" in err) {
			return Result.fail(`Prisma error: ${err.code} - ${err.message}`);
		}

		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to create quiz: ${err}`);
	}
}
