import type { User } from "@prisma/client";
import { PERMISSIONS, ROLE_PERMISSIONS } from "config/permissions";
import type { Request, Response, NextFunction } from "express";

export function checkPermission(permissions: PERMISSIONS[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.body.user as User;

		for (const permission of permissions) {
			const userHasPermission = ROLE_PERMISSIONS[role].includes(permission);

			return userHasPermission ? next() : res.status(401).json({ error: "Unauthorized" });
		}
	};
}
