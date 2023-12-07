import { google, oauth2_v2 } from "googleapis";
import { googleConfig } from "./utils";
import { Result } from "../../utils/response/result";

export async function getUserInfo({
	access_token,
}: {
	access_token: string;
}): Promise<Result<oauth2_v2.Schema$Userinfo>> {
	const client = new google.auth.OAuth2(googleConfig.clientId);

	client.setCredentials({ access_token: access_token });

	const oauth2 = google.oauth2({
		auth: client,
		version: "v2",
	});

	const result = await new Promise<oauth2_v2.Schema$Userinfo>((resolve, reject) => {
		oauth2.userinfo.get((err, res) => {
			if (err) {
				reject(err);
			}

			resolve(res?.data || ({} as oauth2_v2.Schema$Userinfo));
		});
	});

	return Result.ok(result);
}
