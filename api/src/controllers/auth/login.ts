import * as AuthService from "./../../services/auth";

export function login() {
	const auth = AuthService.createConnection();
	const url = AuthService.getConnectionUrl(auth);
	return url;
}
