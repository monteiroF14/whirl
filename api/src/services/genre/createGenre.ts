import { ZodError, z } from "zod";
import { Result } from "../../utils/response/result";
import { database } from "../../config";
import type { Genre } from "../../utils/zod/GenreSchema";

export const CreateGenreServicePropsSchema = z.object({
	name: z.string(),
});

type CreateGenreServiceProps = z.infer<typeof CreateGenreServicePropsSchema>;

export async function createGenre({ name }: CreateGenreServiceProps): Promise<Result<Genre>> {
	CreateGenreServicePropsSchema.parse({ name });

	try {
		const newGenre = await database.genre.create({
			data: {
				name,
			},
		});

		if (!newGenre) {
			return Result.fail("Failed to add genre");
		}

		return Result.ok(newGenre);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to create genre: ${err}`);
		}
	}
}
