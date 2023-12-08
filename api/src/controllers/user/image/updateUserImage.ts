import type { NextFunction, Request, Response } from "express";
import { UpdateUserImageServicePropsSchema } from "../../../services/user/image/updateUserImage";
import type { User } from "../../../utils/zod/UserSchema";
import * as UserService from "../../../services/user";

export async function updateUserImage(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const { image_url } = req.body.user as User;

	const validation = UpdateUserImageServicePropsSchema.safeParse({
		id: +id!,
		image_url,
	});

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.updateUserImage(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to update user image: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
