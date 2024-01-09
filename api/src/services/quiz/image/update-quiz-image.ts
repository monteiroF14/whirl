import { z, ZodError } from "zod";
import { database } from "config";
import { Result } from "utils/response/result";
import type { Quiz } from "utils/zod/quiz-schema";

export const UpdateQuizImagePropsSchema = z.object({
	id: z.number(),
	image_url: z.string(),
});

type UpdateQuizImageProps = z.infer<typeof UpdateQuizImagePropsSchema>;

export async function updateQuizImage({
	id,
	image_url,
}: UpdateQuizImageProps): Promise<Result<Quiz>> {
	UpdateQuizImagePropsSchema.parse({ id, image_url });

	try {
		const updatedQuiz = await database.quiz.update({
			where: {
				id,
			},
			data: {
				image_url,
			},
			include: {
				liked_by: {
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
