import type { NextFunction, Request, Response } from "express";
import * as QuizService from "services/quiz";
import { UpdateQuizImagePropsSchema } from "services/quiz/image/update-quiz-image";
import type { Quiz } from "utils/zod/quiz-schema";

export async function updateQuizImage(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const { image_url } = req.body.quiz as Quiz;

	const validation = UpdateQuizImagePropsSchema.safeParse({
		id: +id!,
		image_url,
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.updateQuizImage(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to update quiz image: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
