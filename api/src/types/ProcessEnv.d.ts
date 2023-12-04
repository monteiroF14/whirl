declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		NODE_ENV: string;

		// base api url
		BASE_URL: string;

		// quiz questions
		QUIZ_MAX_QUESTIONS: number;
		QUIZ_MIN_QUESTIONS: number;

		// quiz questions answers
		QUIZ_QUESTIONS_MAX_ANSWERS: number;
		QUIZ_QUESTIONS_MIN_ANSWERS: number;
	}
}
