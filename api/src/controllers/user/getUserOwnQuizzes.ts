import type { Request, Response } from "express";
import { getUserOwnQuizzesService } from "services/user";

export async function getUserOwnQuizzes(req: Request, res: Response) {
	const { id } = req.body.user;

	try {
		const user = await getUserOwnQuizzesService(id);
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch user own quizzes!" });
	}
}
