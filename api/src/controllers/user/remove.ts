import type { NextFunction, Request, Response } from "express";
import * as UserService from "../../services/user";
import { RemoveUserServicePropsSchema } from "../../services/user/remove";

export async function remove(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = RemoveUserServicePropsSchema.safeParse({ id });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.remove(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to delete user: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
