import { z } from "zod";
import { QuestionSchema } from "./QuestionSchema";
import { UserSchema } from "./UserSchema";

export const QuizVisibilitySchema = z.enum(["public", "private"]);
export type QuizVisibility = z.infer<typeof QuizVisibilitySchema>;

export const QuizGenreSchema = z.enum(["geography", "software", "sport", "movie", "anime"]);
export type QuizGenre = z.infer<typeof QuizGenreSchema>;

export const QuizSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	url: z.string(),
	image_url: z.string(),
	created_at: z.date().default(() => new Date()),
	visibility: QuizVisibilitySchema,
	genre: z.array(QuizGenreSchema),
	views: z.number().default(0),
	rating: z.number().default(0),
	questions: z.array(QuestionSchema).default([]),
	created_by_id: z.number().optional(),
	followed_by: z.array(UserSchema).default([]),
});

export type Quiz = z.infer<typeof QuizSchema>;
