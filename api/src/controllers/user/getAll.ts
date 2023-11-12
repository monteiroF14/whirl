import type { Request, Response } from "express";
import * as UserService from "services/user";

export async function getAll(req: Request, res: Response) {
	try {
		const users = await UserService.getAll();
		res.status(200).json(users);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch users!" });
	}
}
