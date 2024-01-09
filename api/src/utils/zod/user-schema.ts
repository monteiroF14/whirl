import { z } from "zod";

export const UserRoleSchema = z.enum(["APPLICATION_USER", "SUPER_ADMIN"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const FollowUser = z.object({
	followerId: z.number().optional(),
	followingId: z.number().optional(),
});

export const UserSchema = z.lazy(() =>
	z.object({
		id: z.number().optional(),
		name: z.string(),
		email: z.string().email(),
		role: UserRoleSchema.default("APPLICATION_USER"),
		image_url: z.string(),
		refresh_token: z.string(),
		quizzes: z
			.array(
				z.object({
					id: z.number(),
				})
			)
			.default([]),
		liked_quizzes: z
			.array(
				z.object({
					id: z.number(),
				})
			)
			.default([]),
		followers: z.array(FollowUser),
		following: z.array(FollowUser),
	})
);

export type User = z.infer<typeof UserSchema>;

export type UserQuizzes = Pick<User, "quizzes">["quizzes"];
export type UserLikedQuizzes = Pick<User, "liked_quizzes">["liked_quizzes"];

export type UserRefreshToken = Pick<User, "refresh_token">["refresh_token"];

export type UserFollowers = Pick<User, "followers">["followers"];
export type UserFollowing = Pick<User, "following">["following"];
