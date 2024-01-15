import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { FollowUserPropsSchema } from "services/user/follow/follow-user";

export async function followUser(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = FollowUserPropsSchema.safeParse({ userId: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.followUser(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to unfollow user: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
