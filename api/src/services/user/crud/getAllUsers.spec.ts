import { vi, describe, it, expect } from "vitest";
import { database } from "config/__mocks__";
import { UserRole } from "@prisma/client";
import { getAll } from ".";

vi.mock("config");

describe("getAll function", () => {
	// Test case for a successful database query
	it("should return all users when the database query is successful", async () => {
		database.user.findMany.mockResolvedValue([
			{
				id: 1,
				name: "John Doe",
				role: UserRole.APPLICATION_USER,
				image_url: "https://example.com/user1.jpg",
			},
			{
				id: 2,
				name: "Jane Doe",
				role: UserRole.SUPER_ADMIN,
				image_url: "https://example.com/user2.jpg",
			},
		]);

		const result = await getAll();

		expect(result.isSuccess).toBe(true);
		expect(result.value).toStrictEqual([
			{
				id: 1,
				name: "John Doe",
				role: UserRole.APPLICATION_USER,
				image_url: "https://example.com/user1.jpg",
			},
			{
				id: 2,
				name: "Jane Doe",
				role: UserRole.SUPER_ADMIN,
				image_url: "https://example.com/user2.jpg",
			},
		]);
	});
});
