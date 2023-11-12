import type { Request, Response } from "express";
import * as QuizService from "services/quiz";

export async function getAll(req: Request, res: Response) {
	try {
		const quizzes = await QuizService.getAll();
		res.status(200).json(quizzes);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch quizzes!" });
	}
}
