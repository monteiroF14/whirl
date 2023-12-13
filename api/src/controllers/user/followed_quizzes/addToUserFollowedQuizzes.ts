import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { AddToUserFollowedQuizzesServicePropsSchema } from "services/user/followed_quizzes/addToUserFollowedQuizzes";

export async function addToUserFollowedQuizzes(req: Request, res: Response, next: NextFunction) {
	const { quizId } = req.body;
	const { id: userId } = req.params;

	const validation = AddToUserFollowedQuizzesServicePropsSchema.safeParse({
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
		const result = await UserService.addToUserFollowedQuizzes(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to follow quiz: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
