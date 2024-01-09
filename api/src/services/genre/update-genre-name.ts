import { ZodError, z } from "zod";
import { Result } from "utils/response/result";
import { database } from "config";
import type { Genre } from "utils/zod/genre-schema";

export const UpdateGenreNamePropsSchema = z.object({
	id: z.number(),
	name: z.string(),
});

type UpdateGenreNameProps = z.infer<typeof UpdateGenreNamePropsSchema>;

export async function updateGenreName({ id, name }: UpdateGenreNameProps): Promise<Result<Genre>> {
	UpdateGenreNamePropsSchema.parse({ id, name });

	try {
		const existingGenre = await database.genre.findUnique({
			where: {
				id,
			},
		});

		if (!existingGenre) {
			return Result.fail("Genre not found");
		}

		const updatedGenre = await database.genre.update({
			where: {
				id,
			},
			data: {
				name,
			},
		});

		if (!updatedGenre) {
			return Result.fail("Failed to update genre name");
		}

		return Result.ok(updatedGenre);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to update genre name: ${err}`);
		}
	}
}
