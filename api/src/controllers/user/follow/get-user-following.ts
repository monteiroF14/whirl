import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { GetUserFollowingPropsSchema } from "services/user/follow/get-user-following";

export async function getUserFollowing(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetUserFollowingPropsSchema.safeParse({ userId: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.getUserFollowing(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get user following users: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
