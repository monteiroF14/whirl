import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./server";

describe("Express App", () => {
	it("should respond with a 200 status for a GET request", async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
	});

	it('should respond with "server is running" when accessing the root path', async () => {
		const response = await request(app).get("/");
		expect(response.text).toContain("server is running");
	});

	it("should respond with a 404 status for a non-existent route", async () => {
		const response = await request(app).get("/nonexistent");
		expect(response.status).toBe(404);
	});
});
