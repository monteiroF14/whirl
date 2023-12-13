import { type NextFunction, type Request, type Response } from "express";
import * as UserService from "services/user";
import { GetUserFromIdServicePropsSchema } from "services/user/crud/getUserFromId";

export async function getUserFromId(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetUserFromIdServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.getUserFromId(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get user: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
