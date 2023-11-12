import type { Request, Response } from "express";
import * as QuizService from "services/quiz";

export async function remove(req: Request, res: Response) {
	const { id } = req.body.quiz;

	try {
		const quiz = await QuizService.remove(id);
		res.status(200).json(quiz);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to delete quiz!" });
	}
}
