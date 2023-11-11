import type { Request, Response } from "express";
import { getUserByIdService } from "services/user";

export async function getUserById(req: Request, res: Response) {
	const { id } = req.params;

	if (!id) {
		res.status(500).json({ message: "Failed to fetch user!" });
	}

	try {
		const user = await getUserByIdService(id);
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch user!" });
	}
}
