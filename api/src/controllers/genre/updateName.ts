import type { NextFunction, Request, Response } from "express";
import { UpdateGenrePropsSchema } from "../../services/genre/updateName";
import * as GenreController from "../../services/genre";

export async function updateName(req: Request, res: Response, next: NextFunction) {
	const { id: genreId } = req.params;
	const { name: newName } = req.body.genre;

	const validation = UpdateGenrePropsSchema.safeParse({
		id: +genreId!,
		newName,
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await GenreController.updateName(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to update genre name: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
