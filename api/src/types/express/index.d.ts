import type { Quiz } from "../../utils/zod/QuizSchema";
import type { User } from "../../utils/zod/UserSchema";

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
