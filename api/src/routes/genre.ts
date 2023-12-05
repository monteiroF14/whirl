import { Router } from "express";
import { ROLE } from "../config/permissions";
import { require } from "../middleware/require";
import * as GenreController from "../controllers/genre";

const router = Router();

router
	.route("/")
	.post(require(ROLE.SUPER_ADMIN), GenreController.create)
	.get(require(ROLE.APPLICATION_USER), GenreController.getAll);

router
	.route("/:id")
	.put(require(ROLE.SUPER_ADMIN), GenreController.updateName)
	.delete(require(ROLE.SUPER_ADMIN), GenreController.remove);

export default router;
