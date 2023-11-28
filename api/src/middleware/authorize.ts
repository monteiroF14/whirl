import { PERMISSIONS, ROLE_PERMISSIONS } from "../config/permissions";
import type { Response, NextFunction, Request } from "express";
import type { User } from "../utils/zod/UserSchema";

// refactor this to ask for user role instead
export function authorize(requiredPermissions: Array<PERMISSIONS>) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req?.body?.user) {
			return res.status(400).json({ error: "No user provided" });
		}

		const { role } = req.body.user as User;

		for (const permission of requiredPermissions) {
			const userHasPermission = ROLE_PERMISSIONS[role].includes(permission);

			if (!userHasPermission) {
				return res.status(401).json({ error: "Unauthorized" });
			}
		}

		next();
	};
}
