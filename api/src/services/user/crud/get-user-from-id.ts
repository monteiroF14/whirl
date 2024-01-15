import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { User } from "utils/zod/user-schema";

export const GetUserFromIdPropsSchema = z.object({
	id: z.number(),
});

type GetUserFromIdProps = z.infer<typeof GetUserFromIdPropsSchema>;

export async function getUserFromId({ id }: GetUserFromIdProps): Promise<Result<User>> {
	GetUserFromIdPropsSchema.parse({ id });

	try {
		const user = await database.user.findUnique({
			where: {
				id,
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
			return Result.fail<User>(`User not found for ID: ${id}`);
		}

		return Result.ok(user);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail<User>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<User>(`Failed to get user: ${err}`);
		}
	}
}
