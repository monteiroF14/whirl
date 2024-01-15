import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { GetUserFollowersPropsSchema } from "services/user/follow/get-user-followers";

export async function getUserFollowers(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetUserFollowersPropsSchema.safeParse({ userId: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.getUserFollowers(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get user followers: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
