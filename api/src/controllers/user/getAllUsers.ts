import type { Request, Response } from "express";
import { getAllUsersService } from "services/user";

export async function getAllUsers(req: Request, res: Response) {
	try {
		const users = await getAllUsersService();
		res.status(200).json(users);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch users!" });
	}
}
