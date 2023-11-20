import type { Request, Response } from "express";
import * as UserService from "services/user";

export async function getOwnQuizzes(req: Request, res: Response) {
	const { id } = req.body.user;

	try {
		const user = await UserService.getOwnQuizzes(id);
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch user own quizzes!" });
	}
}