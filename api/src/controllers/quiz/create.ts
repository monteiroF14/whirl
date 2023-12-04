import { type NextFunction, type Request, type Response } from "express";
import * as QuizService from "../../services/quiz";
import { CreateQuizServicePropsSchema } from "../../services/quiz/create";

export async function create(req: Request, res: Response, next: NextFunction) {
	const { quiz, user } = req.body;
	// refactor this:
	const userId = +user.id!;
	const validation = CreateQuizServicePropsSchema.safeParse({ quiz, userId });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const createQuizResult = await QuizService.create(validation.data);
		await QuizService.attachToUser({
			quizId: createQuizResult.value.id,
			userId,
		});

		res.sendStatus(201).json(createQuizResult.value);
	} catch (err) {
		next(err);
	}
}
