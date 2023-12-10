import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Result } from "utils/response/result";

interface CustomError {
	message: string;
	errors?: Array<string>;
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof ZodError) {
		const customError: CustomError = {
			message: "Validation error",
			errors: err.errors.map((issue) => issue.message),
		};
		res.status(400).json(customError);
	} else if (err instanceof Result) {
		const customError: CustomError = {
			message: err.error || "Error in operation",
		};
		res.status(err.isSuccess ? 200 : 500).json(customError);
	} else {
		console.error(err);
		const customError: CustomError = {
			message: "Internal server error",
		};
		res.status(500).json(customError);
	}
	next(err);
}
