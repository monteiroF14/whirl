import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import * as UserController from "../../controllers/user";

export const database = mockDeep<PrismaClient>();
export const UserControllerMock = mockDeep<typeof UserController>();

beforeEach(() => {
	mockReset(database), mockReset(UserControllerMock);
});
