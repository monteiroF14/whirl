import type { Request, Response } from "express";
import * as UserService from "services/user";

export async function getFromId(req: Request, res: Response) {
	const { id } = req.params;

	if (!id) {
		res.status(500).json({ message: "Failed to fetch user!" });
	}

	try {
		// refactor this:
		const user = await UserService.getFromId(JSON.parse(id!));
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch user!" });
	}
}
