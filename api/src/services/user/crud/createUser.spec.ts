import { vi, describe, afterEach, it, expect } from "vitest";
import { UserRole } from "@prisma/client";
import { create } from "..";
import { database } from "../../../config/__mocks__";

vi.mock("../../config");

describe("create function", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create a user with valid input", async () => {
		const newUser = {
			name: "John Doe",
		};

		database.user.create.mockResolvedValue({
			id: 1,
			name: newUser.name,
			role: UserRole.APPLICATION_USER,
			image_url: "https://example.com/image.jpg",
		});

		const result = await create(newUser);

		expect(result.isSuccess).toBe(true);
		expect(result.value).toStrictEqual({
			id: 1,
			name: newUser.name,
			role: UserRole.APPLICATION_USER,
			image_url: "https://example.com/image.jpg",
		});
	});

	it("should fail with validation error on invalid input", async () => {
		// @ts-expect-error not valid input
		database.user.create.mockResolvedValue({});

		// @ts-expect-error invalid user data
		const result = await create({});

		expect(result.isFailure).toBe(true);
		expect(result.error).toContain("Validation error");
	});
});
