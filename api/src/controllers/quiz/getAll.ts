import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../services/quiz";

export async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await QuizService.getAll();

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch quizzes: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
