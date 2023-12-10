import type { NextFunction, Request, Response } from "express";
import * as QuizService from "services/quiz";
import { GetQuizFromIdServicePropsSchema } from "services/quiz/crud/getQuizFromId";

export async function getQuizFromId(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetQuizFromIdServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getQuizFromId(validation.data);

		if (result.isFailure) {
			res.status(200).json(result.value);
		}

		res.status(500).json({ message: `Failed to fetch quiz: ${result.error}` });
	} catch (err) {
		next(err);
	}
}
