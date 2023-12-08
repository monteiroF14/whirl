import { z, ZodError } from "zod";
import { database } from "../../config";
import { Result } from "../../utils/response/result";
import type { Genre } from "../../utils/zod/GenreSchema";

export const RemoveGenrePropsSchema = z.object({
	id: z.number(),
});

type RemoveGenreServiceProps = z.infer<typeof RemoveGenrePropsSchema>;

export async function removeGenre({ id }: RemoveGenreServiceProps): Promise<Result<Genre>> {
	RemoveGenrePropsSchema.parse({ id });

	try {
		const genre = await database.genre.delete({
			where: {
				id,
			},
		});

		if (!genre) {
			return Result.fail("Failed to delete genre");
		}

		return Result.ok();
	} catch (err) {
		if (err instanceof ZodError) {
			return Result.fail(`Validation error: ${err.errors[0]?.message}`);
		} else {
			return Result.fail(`Failed to remove genre: ${err}`);
		}
	}
}
