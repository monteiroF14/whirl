import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { User } from "utils/zod/UserSchema";

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
				followed_quizzes: {
					select: {
						id: true,
					},
				},
				own_quizzes: {
					select: {
						id: true,
					},
				},
				user_rating: true,
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
