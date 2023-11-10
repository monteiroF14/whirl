import type { Quiz, User } from "@prisma/client";

declare global {
	namespace Express {
		export interface Request {
			body: {
				user: User;
				quiz: Quiz;
			};
		}
	}
}
