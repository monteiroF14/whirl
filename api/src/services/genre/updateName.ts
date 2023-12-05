import { ZodError, z } from "zod";
import { Result } from "../../utils/response/result";
import { database } from "../../config";
import type { Genre } from "../../utils/zod/GenreSchema";

export const UpdateGenrePropsSchema = z.object({
	id: z.number(), // Assuming you identify the genre by ID
	newName: z.string(), // The new name you want to update to
});

type UpdateGenreProps = z.infer<typeof UpdateGenrePropsSchema>;

export async function updateName({ id, newName }: UpdateGenreProps): Promise<Result<Genre>> {
	UpdateGenrePropsSchema.parse({ id, newName });

	try {
		// Check if the genre with the provided ID exists
		const existingGenre = await database.genre.findUnique({
			where: {
				id,
			},
		});

		if (!existingGenre) {
			return Result.fail<Genre>("Genre not found");
		}

		// Update the genre's name
		const updatedGenre = await database.genre.update({
			where: {
				id,
			},
			data: {
				name: newName,
			},
		});

		if (!updatedGenre) {
			return Result.fail<Genre>("Failed to update genre name");
		}

		return Result.ok(updatedGenre);
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail<Genre>(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail<Genre>(`Failed to update genre name: ${err}`);
		}
	}
}
