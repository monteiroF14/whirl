import type { NextFunction, Request, Response } from "express";

export async function register() {
	return (req: Request, res: Response, next: NextFunction) => {
		next();
	};
}
