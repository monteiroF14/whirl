import { z, ZodError } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";
import type { User } from "@prisma/client";

export const RemoveUserServicePropsSchema = z.object({
	userId: z.number(),
});

type RemoveUserServiceProps = z.infer<typeof RemoveUserServicePropsSchema>;

export async function remove({ userId }: RemoveUserServiceProps): Promise<Result<User>> {
	RemoveUserServicePropsSchema.parse({ userId });

	try {
		const user = await database.user.delete({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return Result.fail<User>("User doesn't exist");
		}

		return Result.ok(user);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail<User>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<User>(`Failed to remove user: ${err}`);
		}
	}
}
