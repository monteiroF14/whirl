import { google } from "googleapis";

const redirectUri = process.env.REDIRECT_URL.split(",");

export const googleConfig = {
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: redirectUri[1],
};

export const oauth2Client = new google.auth.OAuth2({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: redirectUri[1],
});

export const scopes = [
	"https://www.googleapis.com/auth/userinfo.email",
	"https://www.googleapis.com/auth/userinfo.profile",
];
