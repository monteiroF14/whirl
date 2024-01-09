import type { NextFunction, Request, Response } from "express";
import * as QuizService from "services/quiz";
import type { User } from "utils/zod/user-schema";
import { UpdateQuizRatingPropsSchema } from "services/quiz/rating/update-quiz-rating";

export async function updateQuizRating(req: Request, res: Response, next: NextFunction) {
	const { id: quizId } = req.params;
	const { id: userId } = req.body.user as User;

	if (!req.body.rating) {
		res.status(422).json({ message: "Missing rating field" });
	}

	const validation = UpdateQuizRatingPropsSchema.safeParse({
		quizId: +quizId!,
		userId: +userId!,
		userRating: Number(req.body.rating),
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.updateQuizRating(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to update quiz rating: ${result.error}` });
		}

		res.status(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
