import { z } from "zod";
import { QuestionSchema } from "./QuestionSchema";

export const UserRoleSchema = z.enum(["APPLICATION_USER", "SUPER_ADMIN"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	role: UserRoleSchema,
	image_url: z.string(),
	own_quizzes: z.array(QuestionSchema).default([]),
	followed_quizzes: z.array(QuestionSchema).default([]),
});

export type User = z.infer<typeof UserSchema>;
