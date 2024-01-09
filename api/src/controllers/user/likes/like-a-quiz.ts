import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { LikeAQuizPropsSchema } from "services/user/likes/like-a-quiz";

export async function addToUserFollowedQuizzes(req: Request, res: Response, next: NextFunction) {
	const { quizId } = req.body;
	const { id: userId } = req.params;

	const validation = LikeAQuizPropsSchema.safeParse({
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
		const result = await UserService.likeAQuiz(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to follow quiz: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
