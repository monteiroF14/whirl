import type { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

export function authenticate() {
	return (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.header("Authorization");
		const token = authHeader?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Access denied. No token provided." });
		}

		try {
			jwt.verify(token, process.env.JWT_SECRET!);

			next();
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				return res.status(401).json({ message: "Access token has expired." });
			}

			return res.status(401).json({ message: "Invalid token." });
		}
	};
}
