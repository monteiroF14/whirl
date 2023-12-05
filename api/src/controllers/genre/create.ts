import { type NextFunction, type Request, type Response } from "express";
import * as GenreService from "../../services/genre";
import { AddGenrePropsSchema } from "../../services/genre/create";

export async function create(req: Request, res: Response, next: NextFunction) {
	const { genre } = req.body;

	const validation = AddGenrePropsSchema.safeParse({ name: genre?.name });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await GenreService.create(validation.data);

		res.sendStatus(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
