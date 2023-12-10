import type { NextFunction, Request, Response } from "express";
import * as UserService from "../../../services/user";
import { RemoveFromUserFollowedQuizzesServicePropsSchema } from "../../../services/user/followed_quizzes/removeFromUserFollowedQuizzes";

export async function removeFromUserFollowedQuizzes(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { quizId } = req.body;
	const { id: userId } = req.params;

	const validation = RemoveFromUserFollowedQuizzesServicePropsSchema.safeParse({
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
		const result = await UserService.removeFromUserFollowedQuizzes(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to unfollow quiz: ${result.error}` });
		}

		res.status(204).json(result.value);
	} catch (err) {
		next(err);
	}
}
