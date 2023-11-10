class BaseError extends Error {
	code?: string;
	constructor(message: string, name: string, code?: string) {
		super(message);

		this.name = name;

		if (code) {
			this.code = code;
		}

		console.error(message);
	}
}

export class DatabaseError extends BaseError {
	constructor(message: string, code?: string) {
		super(message, "DatabaseError", code);
	}
}

export class ValidationError extends BaseError {
	constructor(message: string, code?: string) {
		super(message, "ValidationError", code);
	}
}

export type CustomError<T> = T | null;
