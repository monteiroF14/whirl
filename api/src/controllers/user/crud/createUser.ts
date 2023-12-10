import type { NextFunction, Request, Response } from "express";
import { CreateUserServicePropsSchema } from "../../../services/user/crud/createUser";
import * as UserService from "../../../services/user";
import * as AuthService from "../../../services/auth";

export async function createUser(req: Request, res: Response, next: NextFunction) {
	const validation = CreateUserServicePropsSchema.safeParse(req.tokens);

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
			if (result.error?.includes("User with this email already exists")) {
				const userInfo = await AuthService.getUserInfo({
					access_token: req.tokens?.access_token as string,
				});

				if (!userInfo || !userInfo.data || !userInfo.data.email) {
					return res.status(500).json({ message: "Failed to retrieve user information" });
				}

				const userInDbResult = await UserService.getUserByEmail({ email: userInfo.data.email });

				if (userInDbResult.isFailure) {
					return res
						.status(500)
						.json({ message: `Failed to get user in db: ${userInDbResult.error}` });
				}

				req.user = userInDbResult.value;

				return next();
			}

			return res.status(500).json({ message: `Failed to create user: ${result.error}` });
		}

		const token = AuthService.createJwtToken({
			id: result.value.id!,
			email: result.value.email,
			role: result.value.role,
			expiration: process.env.REFRESH_TOKEN_EXPIRATION,
		});

		const refreshResult = await UserService.addRefreshTokenToUser({
			id: result.value.id!,
			refresh_token: token,
		});

		if (refreshResult.isFailure) {
			res
				.status(500)
				.json({ message: `Failed to add refresh token to user: ${refreshResult.error}` });
		}

		res.cookie("refreshToken", token, {
			httpOnly: true,
		});

		req.user = result.value;

		return next();
	} catch (err) {
		next(err);
	}
}
