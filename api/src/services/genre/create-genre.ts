import { ZodError, z } from "zod";
import { Result } from "utils/response/result";
import { database } from "config";
import type { Genre } from "utils/zod/genre-schema";

export const CreateGenrePropsSchema = z.object({
	name: z.string(),
});

type CreateGenreProps = z.infer<typeof CreateGenrePropsSchema>;

export async function createGenre({ name }: CreateGenreProps): Promise<Result<Genre>> {
	CreateGenrePropsSchema.parse({ name });

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
