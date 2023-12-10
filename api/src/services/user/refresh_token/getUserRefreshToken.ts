import { database } from "../../../config";
import { ZodError, z } from "zod";
import { Result } from "../../../utils/response/result";
import type { UserRefreshToken } from "../../../utils/zod/UserSchema";

export const GetUserRefreshTokenServicePropsSchema = z.object({
	userId: z.number(),
});

type GetUserRefreshTokenServiceProps = z.infer<typeof GetUserRefreshTokenServicePropsSchema>;

export async function getUserRefreshToken({
	userId,
}: GetUserRefreshTokenServiceProps): Promise<Result<UserRefreshToken>> {
	GetUserRefreshTokenServicePropsSchema.parse({ userId });

	try {
		const user = await database.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				refresh_token: true,
			},
		});

		if (!user || user === null) {
			return Result.fail(`Refresh Token not found for user: ${userId}`);
		}

		return Result.ok(user.refresh_token);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to get user refresh token: ${err}`);
	}
}
