import type { NextFunction, Request, Response } from "express";
import * as GenreService from "../../services/genre";

export async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await GenreService.getAll();

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch quizzes: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
