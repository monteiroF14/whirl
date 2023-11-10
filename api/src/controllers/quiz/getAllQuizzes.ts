import type { Request, Response } from "express";
import { getAllQuizzesService } from "@src/services/quiz";

export async function getAllQuizzes(req: Request, res: Response) {
	try {
		const quizzes = await getAllQuizzesService();
		res.status(200).json(quizzes);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch quizzes!" });
	}
}
