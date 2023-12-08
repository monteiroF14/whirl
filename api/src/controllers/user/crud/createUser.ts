import type { NextFunction, Request, Response } from "express";
import { CreateUserServicePropsSchema } from "../../../services/user/crud/createUser";
import * as UserService from "../../../services/user";
import type { User } from "../../../utils/zod/UserSchema";

export async function createUser(req: Request, res: Response, next: NextFunction) {
	const { name } = req.body.user as User;
	const validation = CreateUserServicePropsSchema.safeParse({ name });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.createUser(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to create user: ${result.error}` });
		}

		res.status(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
