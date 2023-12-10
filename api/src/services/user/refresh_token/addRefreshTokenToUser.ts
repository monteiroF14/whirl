import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { UserRefreshToken } from "../../../utils/zod/UserSchema";

export const AddRefreshTokenToUserServicePropsSchema = z.object({
	id: z.number(),
	refresh_token: z.string(),
});

type AddRefreshTokenToUserServiceProps = z.infer<typeof AddRefreshTokenToUserServicePropsSchema>;

export async function addRefreshTokenToUser({
	id,
	refresh_token,
}: AddRefreshTokenToUserServiceProps): Promise<Result<UserRefreshToken>> {
	AddRefreshTokenToUserServicePropsSchema.parse({ id, refresh_token });

	try {
		const updatedUser = await database.user.update({
			where: {
				id,
			},
			data: {
				refresh_token,
			},
			select: {
				refresh_token: true,
			},
		});

		if (!updatedUser) {
			return Result.fail(`Failed to add refresh token to user: ${id}`);
		}

		return Result.ok(updatedUser.refresh_token);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to add refresh token to user: ${err}`);
	}
}
