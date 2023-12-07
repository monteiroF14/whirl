import { type NextFunction, type Request, type Response } from "express";
import * as UserService from "../../services/user";
import { GetFromIdUserServicePropsSchema } from "../../services/user/getFromId";

export async function getFromId(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetFromIdUserServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.getFromId(validation.data);

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch user: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
