import type { NextFunction, Request, Response } from "express";
import * as UserService from "../../services/user";
import { GetOwnQuizzesUserServicePropsSchema } from "../../services/user/getOwnQuizzes";

export async function getOwnQuizzes(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetOwnQuizzesUserServicePropsSchema.safeParse({ id });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.getOwnQuizzes(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch user own quizzes: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
