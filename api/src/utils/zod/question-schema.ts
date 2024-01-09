import { z } from "zod";

export const QuizAnswerSchema = z.object({
	id: z.number(),
	description: z.string(),
	questionId: z.number(),
});

export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;

export const QuestionSchema = z.object({
	id: z.number().optional(),
	description: z.string(),
	answers: z
		.array(QuizAnswerSchema)
		.max(process.env.QUIZ_QUESTIONS_MAX_ANSWERS ?? 6)
		.min(process.env.QUIZ_QUESTIONS_MIN_ANSWERS ?? 4),
	correct_answer: z.number(),
	created_at: z.date().default(() => new Date()),
	updated_at: z.date().default(() => new Date()),
	quizId: z.number().optional(),
});

export type Question = z.infer<typeof QuestionSchema>;
