import type { UserRole } from "utils/zod/UserSchema";

export type JwtPayload = {
	id: number;
	email: string;
	role: UserRole;
	expiration: string;
};
