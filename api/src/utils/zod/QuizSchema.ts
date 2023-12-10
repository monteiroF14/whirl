import { z } from "zod";
import { QuestionSchema } from "./QuestionSchema";
import { UserRatingSchema } from "./UserSchema";
import { GenreSchema } from "./GenreSchema";

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
		followers: z
			.array(
				z.object({
					id: z.number(),
				})
			)
			.default([]),
		user_rating: z.array(UserRatingSchema).optional().default([]),
	})
);

export type Quiz = z.infer<typeof QuizSchema>;

export type QuizFollowedQuizzes = Pick<Quiz, "followers">["followers"];

export type QuizRating = Pick<Quiz, "rating">["rating"];

export type QuizViews = Pick<Quiz, "views">["views"];
