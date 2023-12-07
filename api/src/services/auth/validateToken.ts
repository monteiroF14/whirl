import { google } from "googleapis";
import { googleConfig } from "./utils";
import { Result } from "../../utils/response/result";

export async function validateToken({ token }: { token: string }): Promise<Result<boolean>> {
	const client = new google.auth.OAuth2(googleConfig.clientId);

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: googleConfig.clientId,
		});

		const payload = ticket?.getPayload();

		if (!payload) {
			return Result.fail("No payload in the token");
		}

		return Result.ok(true);
	} catch (err) {
		return Result.fail(err + "");
	}
}
