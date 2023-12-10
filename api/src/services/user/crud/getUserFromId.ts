import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { User } from "../../../utils/zod/UserSchema";

export const GetUserFromIdServicePropsSchema = z.object({
	id: z.number(),
});

type GetUserFromIdServiceProps = z.infer<typeof GetUserFromIdServicePropsSchema>;

export async function getUserFromId({ id }: GetUserFromIdServiceProps): Promise<Result<User>> {
	GetUserFromIdServicePropsSchema.parse({ id });

	try {
		const user = await database.user.findUnique({
			where: {
				id,
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
