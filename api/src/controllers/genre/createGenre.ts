import { type NextFunction, type Request, type Response } from "express";
import * as GenreService from "services/genre";
import { CreateGenreServicePropsSchema } from "services/genre/createGenre";

export async function createGenre(req: Request, res: Response, next: NextFunction) {
	const { genre } = req.body;

	const validation = CreateGenreServicePropsSchema.safeParse({ name: genre?.name });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await GenreService.createGenre(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to create user: ${result.error}` });
		}

		res.status(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
