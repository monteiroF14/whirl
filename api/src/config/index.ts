import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const config = {
	server: {
		port: process.env.PORT || 3000,
	},
	database: prisma,
};

export const { server } = config;
export const { database } = config;
