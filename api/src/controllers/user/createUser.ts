import type { Request, Response } from "express";
import { createUserService } from "@src/services/user";

export async function createUser(req: Request, res: Response) {
	const { user } = req.body;

	try {
		const newUser = await createUserService(user);
		res.status(201).json(newUser);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch users!" });
	}
}
