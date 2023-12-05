import type { NextFunction, Request, Response } from "express";
import type { User } from "../utils/zod/UserSchema";
import type { ROLE } from "../config/permissions";

export function require(requiredRole: ROLE) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { user } = req.body;

		if (!user?.role) {
			return res.status(400).json({ error: "No user or role provided" });
		}

		const { role: userRole } = user as User;

		if (userRole !== requiredRole) {
			return res.status(401).json({ error: "Unauthorized: no permission" });
		}

		next();
	};
}
