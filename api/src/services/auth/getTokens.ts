import type { Credentials } from "google-auth-library";
import { createConnection } from ".";
import { Result } from "utils/response/result";

export async function getTokens({ code }: { code: string }): Promise<Result<Credentials>> {
	const auth = createConnection();

	const { tokens } = await auth.getToken(code);

	if (!tokens) {
		return Result.fail("couldn't get token");
	}

	return Result.ok(tokens);
}
