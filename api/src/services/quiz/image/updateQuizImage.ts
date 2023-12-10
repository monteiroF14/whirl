import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/QuizSchema";

export const UpdateQuizImageServicePropsSchema = z.object({
	id: z.number(),
	image_url: z.string(),
});

type UpdateQuizImageServiceProps = z.infer<typeof UpdateQuizImageServicePropsSchema>;

export async function updateQuizImage({
	id,
	image_url,
}: UpdateQuizImageServiceProps): Promise<Result<Quiz>> {
	UpdateQuizImageServicePropsSchema.parse({ id, image_url });

	try {
		const updatedQuiz = await database.quiz.update({
			where: {
				id,
			},
			data: {
				image_url,
			},
			include: {
				followers: {
					select: {
						id: true,
					},
				},
				genres: true,
				questions: {
					include: {
						answers: true,
					},
				},
				user_rating: true,
			},
		});

		if (!updatedQuiz) {
			return Result.fail("Failed to update quiz image");
		}

		return Result.ok(updatedQuiz);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		}

		return Result.fail(`Failed to update quiz image: ${err}`);
	}
}
