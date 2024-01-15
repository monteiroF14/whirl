declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		NODE_ENV: string;

		// base api url
		BASE_URL: string;

		// google oauth
		CLIENT_ID: string;
		CLIENT_SECRET: string;

		REDIRECT_URL: string;

		// quiz questions
		QUIZ_MAX_QUESTIONS: number;
		QUIZ_MIN_QUESTIONS: number;

		// jwt
		ACCESS_TOKEN_EXPIRATION: string;
		JWT_SECRET: string;

		// quiz questions answers
		QUIZ_QUESTIONS_MAX_ANSWERS: number;
		QUIZ_QUESTIONS_MIN_ANSWERS: number;
	}
}
