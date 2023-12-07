import { google } from "googleapis";
import { googleConfig } from "./utils";

export function createConnection() {
	return new google.auth.OAuth2(
		googleConfig.clientId,
		googleConfig.clientSecret,
		googleConfig.redirectUri
	);
}
