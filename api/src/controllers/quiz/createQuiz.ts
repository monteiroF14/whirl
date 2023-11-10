import { createQuizService } from "@src/services/quiz";
import type { Request, Response } from "express";

export async function createQuiz(req: Request, res: Response) {
	const { quiz } = req.body;
	const { id: userId } = req.body.user;

	try {
		const newQuiz = await createQuizService(quiz, userId);
		res.status(201).json(newQuiz);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to create quiz!" });
	}
}
