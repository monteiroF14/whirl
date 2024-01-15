import jwt from "jsonwebtoken";
import type { JwtPayload } from "types/JwtPayload";

export function createJwtToken(payload: JwtPayload) {
	if (!payload.expiration) {
		return jwt.sign(payload, process.env.JWT_SECRET!);
	}

	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: payload.expiration });
}
