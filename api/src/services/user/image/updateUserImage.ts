import { z, ZodError } from "zod";
import { database } from "../../../config";
import { Result } from "../../../utils/response/result";
import type { User } from "../../../utils/zod/UserSchema";

export const UpdateUserImageServicePropsSchema = z.object({
	id: z.number(),
	image_url: z.string(),
});

type UpdateUserImageServiceProps = z.infer<typeof UpdateUserImageServicePropsSchema>;

export async function updateUserImage({
	id,
	image_url,
}: UpdateUserImageServiceProps): Promise<Result<User>> {
	UpdateUserImageServicePropsSchema.parse({ id, image_url });

	try {
		const updatedUser = await database.user.update({
			where: {
				id,
			},
			data: {
				image_url,
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

		if (!updatedUser) {
			return Result.fail("Failed to update user image");
		}

		return Result.ok(updatedUser);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to update user image: ${err}`);
		}
	}
}
