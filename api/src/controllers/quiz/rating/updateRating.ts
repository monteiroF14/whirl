import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../../services/quiz";
import type { User } from "../../../utils/zod/UserSchema";
import { UpdateRatingQuizServicePropsSchema } from "../../../services/quiz/rating/updateRating";

export async function updateRating(req: Request, res: Response, next: NextFunction) {
	const { id: quizId } = req.params;
	const { id: userId } = req.body.user as User;

	if (!req.body.user_rating) {
		res.status(422).json({ message: "Missing user_rating field" });
	}

	const validation = UpdateRatingQuizServicePropsSchema.safeParse({
		quizId: +quizId!,
		userId: +userId!,
		userRating: Number(req.body.user_rating),
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.updateRating(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to update quiz rating: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
