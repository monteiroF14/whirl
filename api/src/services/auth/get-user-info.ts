import { google } from "googleapis";

import { promisify } from "util";
import { googleConfig } from "services/auth/utils";

export async function getUserInfo({ access_token }: { access_token: string }) {
	const client = new google.auth.OAuth2(googleConfig.clientId);
	client.setCredentials({ access_token });

	const oauth2 = google.oauth2({
		auth: client,
		version: "v2",
	});

	const getUserInfoAsync = promisify(oauth2.userinfo.get).bind(oauth2.userinfo);

	return await getUserInfoAsync();
}
