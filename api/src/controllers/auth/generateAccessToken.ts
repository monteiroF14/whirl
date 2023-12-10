import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as AuthService from "../../services/auth";
import * as UserService from "../../services/user";
import type { JwtPayload } from "../../types/JwtPayload";

export async function generateAccessToken(req: Request, res: Response) {
	try {
		const { id: userId } = req.user!;

		if (!userId) {
			return res.status(401).json({ message: "User not provided." });
		}

		const refreshTokenFromDb = await UserService.getUserRefreshToken({ userId });

		const refreshToken = refreshTokenFromDb.isSuccess
			? refreshTokenFromDb.value
			: req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "Refresh token not provided." });
		}

		const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as JwtPayload;

		const accessToken = AuthService.createJwtToken({
			id: decoded.id,
			email: decoded.email,
			role: decoded.role,
			expiration: process.env.ACCESS_TOKEN_EXPIRATION,
		});

		res.header("Authorization", `Bearer ${accessToken}`);
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
		});

		res.status(200).json({ accessToken, user: req.user });
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ message: "Refresh token has expired." });
		}

		if (err instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ message: "Invalid refresh token." });
		}

		return res.status(500).json({ message: err });
	}
}
