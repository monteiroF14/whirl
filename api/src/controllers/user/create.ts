import type { Request, Response } from "express";
import * as UserService from "services/user";

export async function create(req: Request, res: Response) {
	const { user } = req.body;

	try {
		const newUser = await UserService.create(user);
		res.status(201).json(newUser);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch users!" });
	}
}
