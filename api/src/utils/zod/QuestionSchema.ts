import { z } from "zod";

export const QuizOptionSchema = z.enum(["text"]);
export type QuizOption = z.infer<typeof QuizOptionSchema>;

export const QuestionSchema = z.object({
	id: z.number(),
	options: z.array(QuizOptionSchema),
	correct_option: z.number(),
	quizId: z.number(),
});

export type Question = z.infer<typeof QuestionSchema>;
