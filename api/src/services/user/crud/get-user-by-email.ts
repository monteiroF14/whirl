import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { User } from "utils/zod/user-schema";

export const GetUserByEmailServicePropsSchema = z.object({
	email: z.string(),
});

type GetUserByEmailServiceProps = z.infer<typeof GetUserByEmailServicePropsSchema>;

export async function getUserByEmail({ email }: GetUserByEmailServiceProps): Promise<Result<User>> {
	GetUserByEmailServicePropsSchema.parse({ email });

	try {
		const user = await database.user.findUnique({
			where: {
				email,
			},
			include: {
				liked_quizzes: {
					select: {
						id: true,
					},
				},
				followers: {
					select: {
						followerId: true,
					},
				},
				following: {
					select: {
						followingId: true,
					},
				},
				quizzes: {
					select: {
						id: true,
					},
				},
				ratings: true,
			},
		});

		if (!user) {
			return Result.fail<User>(`User not found for email: ${email}`);
		}

		return Result.ok(user);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail<User>(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail<User>(`Failed to get user: ${err}`);
	}
}
