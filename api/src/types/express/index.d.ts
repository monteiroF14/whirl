import { Credentials } from "google-auth-library";
import type { User } from "utils/zod/UserSchema";

declare global {
	namespace Express {
		export interface Request {
			id_token?: string;
			tokens?: Credentials;
			user?: User;
		}
	}
}
