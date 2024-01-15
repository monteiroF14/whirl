import type { NextFunction, Request, Response } from "express";
import * as GenreService from "services/genre";

export async function getAllGenres(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await GenreService.getAllGenres();

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get genres: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
