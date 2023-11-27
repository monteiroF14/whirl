import { type NextFunction, type Request, type Response } from "express";
import * as QuizService from "../../services/quiz";
import { CreateQuizServicePropsSchema } from "../../services/quiz/create";

export async function create(req: Request, res: Response, next: NextFunction) {
	const { quiz, userId } = req.body;
	const validation = CreateQuizServicePropsSchema.safeParse({ quiz, userId });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.create(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to create user: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
