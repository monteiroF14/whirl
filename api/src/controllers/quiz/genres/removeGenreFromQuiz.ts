import type { NextFunction, Request, Response } from "express";

import type { User } from "utils/zod/UserSchema";
import * as QuizService from "services/quiz";
import { RemoveGenreFromQuizServicePropsSchema } from "services/quiz/genres/removeGenreFromQuiz";

export async function removeGenreFromQuiz(req: Request, res: Response, next: NextFunction) {
	// TODO refactor this:
	const { id: quizId } = req.params;
	const { id: userId } = req.body.user as User;
	const { genre } = req.body;

	if (!genre) {
		res.status(500).json({ message: "must have a genre" });
		return;
	}

	const validation = RemoveGenreFromQuizServicePropsSchema.safeParse({
		quizId: +quizId!,
		userId: +userId!,
		genre: genre + "",
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.removeGenreFromQuiz(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to remove genre from quiz: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
