import { PERMISSIONS, ROLE_PERMISSIONS } from "../config/permissions";
import type { Request, Response, NextFunction } from "express";
import type { User } from "../utils/zod/UserSchema";

// refactor this to ask for user role instead
// maybe make it work if there is no user?
export function checkPermission(permissions: Array<PERMISSIONS>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.body.user as User;

		for (const permission of permissions) {
			const userHasPermission = ROLE_PERMISSIONS[role].includes(permission);

			return userHasPermission ? next() : res.status(401).json({ error: "Unauthorized" });
		}
	};
}
