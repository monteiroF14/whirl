import type { NextFunction, Request, Response } from "express";
import * as GenreController from "../../services/genre";
import { RemoveGenrePropsSchema } from "../../services/genre/removeGenre";

export async function removeGenre(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = RemoveGenrePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await GenreController.removeGenre(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to delete genre: ${result.error}` });
		}

		res.status(204).json(result.value);
	} catch (err) {
		next(err);
	}
}
