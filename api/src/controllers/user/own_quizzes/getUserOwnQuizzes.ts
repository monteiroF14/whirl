import type { NextFunction, Request, Response } from "express";
import * as UserService from "../../../services/user";
import { GetUserOwnQuizzesServicePropsSchema } from "../../../services/user/own_quizzes/getUserOwnQuizzes";

export async function getUserOwnQuizzes(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetUserOwnQuizzesServicePropsSchema.safeParse({ userId: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.getUserOwnQuizzes(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get user own quizzes: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
