import type { NextFunction, Request, Response } from "express";
import type { ROLE } from "../config/permissions";

export function require(requiredRole: ROLE) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user?.role) {
			return res.status(400).json({ error: "No user or role provided" });
		}

		if (req.user?.role !== requiredRole) {
			return res.status(401).json({ error: "Unauthorized: no permission" });
		}

		next();
	};
}
