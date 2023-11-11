import type { Request, Response } from "express";
import { getUserFollowedQuizzesService } from "services/user";

export async function getUserFollowedQuizzes(req: Request, res: Response) {
	const { id } = req.body.user;

	try {
		const user = await getUserFollowedQuizzesService(id);
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch user followed quizzes!" });
	}
}
