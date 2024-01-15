import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { UnfollowUserPropsSchema } from "services/user/follow/unfollow-user";

export async function unfollowUser(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const { userToUnfollowId: userId } = req.body.unfollow;
	const validation = UnfollowUserPropsSchema.safeParse({ userId: +id!, userToUnfollowId: userId });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.unfollowUser(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to unfollow user: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
