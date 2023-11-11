import { describe, expect, it } from "vitest";

describe("create user", () => {
	it("should create a new user successfully", async () => {
		const newUser = {
			name: "bluueem",
			role: "APPLICATION_USER",
		};

		//@ts-expect-error user not in right format
		const newUserService = await createUserService(newUser);
		expect(newUserService).not.toThrow();
	});

	it("should throw a error when the user isn't passed properly", async () => {
		const newUser = {
			email: "",
			password: "",
		};

		//@ts-expect-error should expect error because user is not being passed properly
		expect(async () => await createUser(newUser)).toThrow();
	});
});
