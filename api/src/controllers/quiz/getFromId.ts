import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../services/quiz";
import { GetFromIdQuizServicePropsSchema } from "../../services/quiz/getFromId";

export async function getFromId(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetFromIdQuizServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getFromId(validation.data);

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch quiz: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
