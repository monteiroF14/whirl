import type { Quiz } from "../../utils/zod/QuizSchema";
import type { User } from "../../utils/zod/UserSchema";

// not working
//  go deeper into it
declare global {
	namespace Express {
		export interface Request {
			body: {
				user?: User;
				quiz?: Quiz;
			};
		}
	}
}
