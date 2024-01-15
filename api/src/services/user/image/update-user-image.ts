import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { User } from "utils/zod/user-schema";

export const UpdateUserImagePropsSchema = z.object({
	id: z.number(),
	image_url: z.string(),
});

type UpdateUserImageProps = z.infer<typeof UpdateUserImagePropsSchema>;

export async function updateUserImage({
	id,
	image_url,
}: UpdateUserImageProps): Promise<Result<User>> {
	UpdateUserImagePropsSchema.parse({ id, image_url });

	try {
		const updatedUser = await database.user.update({
			where: {
				id,
			},
			data: {
				image_url,
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
