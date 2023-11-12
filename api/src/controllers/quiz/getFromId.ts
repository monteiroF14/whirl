import type { Request, Response } from "express";
import * as QuizService from "services/quiz";

export async function getFromId(req: Request, res: Response) {
	const { id } = req.body.quiz;

	try {
		const quiz = await QuizService.getFromId(id);
		res.status(200).json(quiz);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch quiz!" });
	}
}
