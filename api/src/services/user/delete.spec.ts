import { deleteUserService } from "services/user";
import { ValidationError } from "utils/response/errors";
import { describe, expect, it } from "vitest";

describe("delete user by id", () => {
	it("should delete user successfully", async () => {
		//@ts-expect-error should expect error because non existent
		await expect(deleteUserService(newUserId!)).resolves.toBeUndefined();
	});

	it("should throw if the user ID doesn't exist in the database", async () => {
		try {
			// re-do this:
			await deleteUserService(0);
		} catch (err) {
			expect(err).toBeInstanceOf(ValidationError);
		}
	});
});
