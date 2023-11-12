import type { Request, Response } from "express";
import * as QuizService from "services/quiz";

export async function create(req: Request, res: Response) {
	const { quiz } = req.body;
	const { id: userId } = req.body.user;

	try {
		const newQuiz = await QuizService.create(quiz, userId);
		res.status(201).json(newQuiz);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to create quiz!" });
	}
}
