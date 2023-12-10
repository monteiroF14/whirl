import { type NextFunction, type Request, type Response } from "express";
import * as QuizService from "services/quiz";
import { CreateQuizServicePropsSchema } from "services/quiz/crud/createQuiz";

export async function createQuiz(req: Request, res: Response, next: NextFunction) {
	const { quiz, user } = req.body;

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
		const result = await QuizService.createQuiz(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to create quiz: ${result.error}` });
		}

		res.status(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
