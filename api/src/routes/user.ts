import { Router } from "express";
import * as UserController from "./../controllers/user";
import { PERMISSIONS } from "../config/permissions";
import { checkPermission } from "../middleware/checkPermission";

const router = Router();

router
	.route("/")
	.get(checkPermission([PERMISSIONS.USERS_READ]), UserController.getAll)
	.post(UserController.create);

router
	.route("/:id")
	.get(checkPermission([PERMISSIONS.USERS_READ]), UserController.getFromId)
	.delete(checkPermission([PERMISSIONS.USERS_DELETE]), UserController.remove);

export default router;
