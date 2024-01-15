import type { UserRole } from "utils/zod/user-schema";

export type JwtPayload = {
	id: number;
	email: string;
	role: UserRole;
	expiration?: string;
};
