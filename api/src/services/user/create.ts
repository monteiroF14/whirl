import type { User } from "@prisma/client";
import { ZodError, z } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";

export const CreateUserServicePropsSchema = z.object({
	name: z.string(),
});

type CreateUserServiceProps = z.infer<typeof CreateUserServicePropsSchema>;

export async function create({ name }: CreateUserServiceProps): Promise<Result<User>> {
	try {
		CreateUserServicePropsSchema.parse({ name });

		const newUser = await database.user.create({
			data: {
				name,
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
