import type { NextFunction, Request, Response } from "express";
import * as GenreController from "../../services/genre";
import { RemoveGenrePropsSchema } from "../../services/genre/remove";

export async function remove(req: Request, res: Response, next: NextFunction) {
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
		const result = await GenreController.remove(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to delete genre: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
