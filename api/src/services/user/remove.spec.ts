import { describe, expect, it, vi } from "vitest";
import { remove } from ".";
import { database } from "../../config/__mocks__";

vi.mock("../../config");

describe("delete user by id", () => {
	it("should delete user successfully", async () => {
		const userId = 1;

		database.user.delete.mockResolvedValue({
			id: userId,
			image_url: "non-existent",
			name: "non-existent",
			role: "APPLICATION_USER",
		});

		const result = await remove({ userId });

		expect(database.user.delete).toHaveBeenCalledWith({
			where: {
				id: userId,
			},
		});

		expect(result.isSuccess).toBe(true);
		expect(result.value).toStrictEqual({
			id: userId,
			image_url: "non-existent",
			name: "non-existent",
			role: "APPLICATION_USER",
		});
	});
});
