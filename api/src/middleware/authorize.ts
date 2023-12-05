import type { Response, NextFunction, Request } from "express";

export function authorize() {
	return (req: Request, res: Response, next: NextFunction) => {
		// TODO: write the jwt auth middleware here

		next();
	};
}
