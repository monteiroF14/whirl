import type { NextFunction, Request, Response } from "express";

import * as GenreController from "services/genre";
import { UpdateGenreNamePropsSchema } from "services/genre/update-genre-name";

export async function updateGenreName(req: Request, res: Response, next: NextFunction) {
	const { id: genreId } = req.params;
	const { name } = req.body.genre;

	const validation = UpdateGenreNamePropsSchema.safeParse({
		id: +genreId!,
		name,
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await GenreController.updateGenreName(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to update genre name: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
