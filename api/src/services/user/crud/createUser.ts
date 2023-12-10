import { ZodError, z } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { User } from "../../../utils/zod/UserSchema";
import * as AuthService from "../../auth";

export const CreateUserServicePropsSchema = z.object({
	access_token: z.string(),
});

type CreateUserServiceProps = z.infer<typeof CreateUserServicePropsSchema>;

export async function createUser({ access_token }: CreateUserServiceProps): Promise<Result<User>> {
	try {
		CreateUserServicePropsSchema.parse({ access_token });

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
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to create user: ${err}`);
	}
}
