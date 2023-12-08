import { ZodError, z } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { User } from "../../../utils/zod/UserSchema";

export const CreateUserServicePropsSchema = z.object({
	name: z.string(),
});

type CreateUserServiceProps = z.infer<typeof CreateUserServicePropsSchema>;

export async function createUser({ name }: CreateUserServiceProps): Promise<Result<User>> {
	try {
		CreateUserServicePropsSchema.parse({ name });

		const newUser = await database.user.create({
			data: {
				name,
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

		return Result.ok(newUser);
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return Result.fail<User>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<User>(`Failed to create user: ${err}`);
		}
	}
}
