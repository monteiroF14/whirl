import { database } from "config";
import { Result } from "utils/response/result";
import type { Genre } from "utils/zod/genre-schema";

export async function getAllGenres(): Promise<Result<Array<Genre>>> {
	try {
		const allGenres = await database.genre.findMany();

		if (!allGenres) {
			Result.fail("Failed to get all genres");
		}

		return Result.ok(allGenres);
	} catch (err) {
		return Result.fail(`Failed to retrieve genres: ${err}`);
	}
}
