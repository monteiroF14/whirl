import { z } from "zod";

export const UserRoleSchema = z.enum(["APPLICATION_USER", "SUPER_ADMIN"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserRatingSchema = z.object({
	id: z.number().optional(),
	rating: z.number(),
	userId: z.number(),
	quizId: z.number(),
	created_at: z.date().optional(),
	updated_at: z.date().optional(),
});

export const UserSchema = z.lazy(() =>
	z.object({
		id: z.number().optional(),
		name: z.string(),
		email: z.string().email(),
		role: UserRoleSchema.default("APPLICATION_USER"),
		image_url: z.string(),
		refresh_token: z.string(),
		own_quizzes: z
			.array(
				z.object({
					id: z.number(),
				})
			)
			.default([]),
		followed_quizzes: z
			.array(
				z.object({
					id: z.number(),
				})
			)
			.default([]),
		user_rating: z.array(UserRatingSchema).default([]),
	})
);

export type User = z.infer<typeof UserSchema>;

export type UserOwnQuizzes = Pick<User, "own_quizzes">["own_quizzes"];
export type UserFollowedQuizzes = Pick<User, "followed_quizzes">["followed_quizzes"];

export type UserRefreshToken = Pick<User, "refresh_token">["refresh_token"];
