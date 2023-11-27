import type { NextFunction, Request, Response } from "express";
import * as UserService from "../../services/user";

export async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await UserService.getAll();

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch users: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
