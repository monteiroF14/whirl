import type { NextFunction, Request, Response } from "express";
import * as UserService from "../../services/user";
import { RemoveFromFollowedQuizzesUserServicePropsSchema } from "../../services/user/removeFromFollowedQuizzes";

export async function removeFromFollowedQuizzes(req: Request, res: Response, next: NextFunction) {
	const { quizId } = req.body;
	const { id: userId } = req.params;

	const validation = RemoveFromFollowedQuizzesUserServicePropsSchema.safeParse({
		userId: +userId!,
		quizId: +quizId!,
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.removeFromFollowedQuizzes(validation.data);

		if (result.isSuccess) {
			res.status(204).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to create user: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
