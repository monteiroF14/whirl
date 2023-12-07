import { scopes, type oauth2Client } from "./utils";

export function getConnectionUrl(auth: typeof oauth2Client) {
	return auth.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: scopes,
	});
}
