import type { Request, Response } from "express";
import { deleteQuizService } from "services/quiz";

export async function deleteQuiz(req: Request, res: Response) {
	const { id } = req.body.quiz;

	try {
		const quiz = await deleteQuizService(id);
		res.status(200).json(quiz);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to delete quiz!" });
	}
}
