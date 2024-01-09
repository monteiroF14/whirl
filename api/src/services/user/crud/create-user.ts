import { ZodError, z } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { User } from "utils/zod/user-schema";
import * as AuthService from "services/auth";

export const CreateUserPropsSchema = z.object({
	access_token: z.string(),
});

type CreateUserProps = z.infer<typeof CreateUserPropsSchema>;

export async function createUser({ access_token }: CreateUserProps): Promise<Result<User>> {
	try {
		CreateUserPropsSchema.parse({ access_token });

		const getUserInfoResult = await AuthService.getUserInfo({ access_token });

		if (!getUserInfoResult?.data) {
			return Result.fail("Failed to obtain user information");
		}

		const { data: userInfo } = getUserInfoResult;

		const existingUser = await database.user.findUnique({
			where: { email: userInfo.email as string },
		});

		if (existingUser) {
			return Result.fail("User with this email already exists");
		}

		const newUser = await database.user.create({
			data: {
				email: userInfo.email as string,
				name: userInfo.name as string,
				image_url: userInfo.picture as string,
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

		return Result.ok(newUser);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to create user: ${err}`);
	}
}
