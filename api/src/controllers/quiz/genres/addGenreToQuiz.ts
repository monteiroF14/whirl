import type { NextFunction, Request, Response } from "express";
import * as QuizService from "services/quiz";
import type { User } from "utils/zod/UserSchema";
import { AddGenreToQuizServicePropsSchema } from "services/quiz/genres/addGenreToQuiz";

export async function addGenreToQuiz(req: Request, res: Response, next: NextFunction) {
	const { id: quizId } = req.params;
	const { id: userId } = req.body.user as User;
	const { genre } = req.body;

	if (!genre) {
		res.status(500).json({ message: "must have a genre" });
	}

	const validation = AddGenreToQuizServicePropsSchema.safeParse({
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
		const result = await QuizService.addGenreToQuiz(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to add genre to quiz: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
