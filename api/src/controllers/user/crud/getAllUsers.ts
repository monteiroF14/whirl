import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await UserService.getAllUsers();

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get users: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
