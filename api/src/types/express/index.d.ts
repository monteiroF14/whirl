import { Credentials } from "google-auth-library";
import type { User } from "utils/zod/user-schema";

declare global {
	namespace Express {
		export interface Request {
			id_token?: string;
			tokens?: Credentials;
			user?: User;
		}
	}
}
