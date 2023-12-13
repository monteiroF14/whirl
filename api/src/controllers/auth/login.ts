import { type Request, type Response } from "express";
import * as AuthService from "services/auth";

export function login(req: Request, res: Response) {
	const auth = AuthService.createConnection();
	const url = AuthService.getConnectionUrl(auth);

	res.redirect(url);
}
