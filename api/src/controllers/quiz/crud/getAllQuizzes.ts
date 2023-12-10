import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../../services/quiz";

export async function getAllQuizzes(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await QuizService.getAllQuizzes();

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to fetch quizzes: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
