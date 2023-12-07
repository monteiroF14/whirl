import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../../services/quiz";
import type { User } from "../../../utils/zod/UserSchema";
import { AddFollowerServicePropsSchema } from "../../../services/quiz/followers/addFollower";

export async function addFollower(req: Request, res: Response, next: NextFunction) {
	const { id: quizId } = req.params;
	const { id: userId } = req.body.user as User;

	const validation = AddFollowerServicePropsSchema.safeParse({
		quizId: +quizId!,
		userId: +userId!,
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.addFollower(validation.data);

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to update quiz follower: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
