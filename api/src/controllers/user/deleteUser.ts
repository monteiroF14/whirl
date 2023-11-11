import type { Request, Response } from "express";
import { deleteUserService } from "services/user";

export async function deleteUser(req: Request, res: Response) {
	const { id } = req.body.user;

	try {
		const user = await deleteUserService(id);
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to delete user!" });
	}
}
