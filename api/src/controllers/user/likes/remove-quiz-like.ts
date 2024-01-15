import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { RemoveQuizLikePropsSchema } from "services/user/likes/remove-quiz-like";

export async function removeQuizLike(req: Request, res: Response, next: NextFunction) {
	const quiz = req.quiz;

	if (!quiz || quiz.id) {
		return res.status(401).json({ message: "missing quiz id" });
	}

	const { id } = req.params;
	const userId = +id!;

	const validation = RemoveQuizLikePropsSchema.safeParse({
		userId: userId,
		quizId: +quiz.id!,
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const didUserLikeQuiz = quiz.liked_by.some(({ id }) => id === userId);

		if (!didUserLikeQuiz) {
			return res
				.status(401)
				.json({ message: "cant remove a like from a quiz that the user didnt like" });
		}

		const result = await UserService.removeQuizLike(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to remove like from quiz: ${result.error}` });
		}

		res.status(204).json(result.value);
	} catch (err) {
		next(err);
	}
}
