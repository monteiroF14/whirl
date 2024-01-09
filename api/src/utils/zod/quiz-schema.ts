import { z } from "zod";
import { QuestionSchema } from "utils/zod/question-schema";
import { GenreSchema } from "utils/zod/genre-schema";

export const QuizVisibilitySchema = z.enum(["public", "private"]);
export type QuizVisibility = z.infer<typeof QuizVisibilitySchema>;

export const QuizSchema = z.lazy(() =>
	z.object({
		id: z.number().optional(),
		name: z.string(),
		url: z.string().default(""),
		image_url: z
			.string()
			.default(
				"https://img.freepik.com/vetores-premium/quiz-vector-ilustracao-estilo-pop-com-megafone-em-fundo-amarelo_194782-902.jpg"
			),
		created_at: z.date().default(() => new Date()),
		visibility: QuizVisibilitySchema,
		genres: z.array(GenreSchema),
		views: z.number().default(0),
		rating: z.number().default(0),
		questions: z
			.array(QuestionSchema)
			.max(process.env.QUIZ_MAX_QUESTIONS ?? 6)
			.min(process.env.QUIZ_MIN_QUESTIONS ?? 2),
		created_by_id: z.number(),
		likes: z.number(),
		liked_by: z
			.array(
				z.object({
					id: z.number(),
				})
			)
			.default([]),
	})
);

export type Quiz = z.infer<typeof QuizSchema>;
export type QuizLikes = Pick<Quiz, "likes" | "liked_by">;
export type QuizRating = Pick<Quiz, "rating">["rating"];
export type QuizViews = Pick<Quiz, "views">["views"];
