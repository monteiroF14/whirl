import { z, ZodError } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";
import type { User } from "@prisma/client";

export const GetFromIdUserServicePropsSchema = z.object({
	id: z.number(),
});

type GetFromIdUserServiceProps = z.infer<typeof GetFromIdUserServicePropsSchema>;

export async function getFromId({ id }: GetFromIdUserServiceProps): Promise<Result<User>> {
	GetFromIdUserServicePropsSchema.parse({ id });

	try {
		const user = await database.user.findUnique({
			where: {
				id,
			},
			include: {
				followed_quizzes: true,
				own_quizzes: true,
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
			return Result.fail<User>(`Failed to fetch user: ${err}`);
		}
	}
}
