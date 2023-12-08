import { Router } from "express";
import { ROLE } from "../config/permissions";
import { require } from "../middleware/require";
import * as GenreController from "../controllers/genre";

const router = Router();

router
	.route("/")
	.post(require(ROLE.SUPER_ADMIN), GenreController.createGenre)
	.get(require(ROLE.APPLICATION_USER), GenreController.getAllGenres);

router
	.route("/:id")
	.put(require(ROLE.SUPER_ADMIN), GenreController.updateGenreName)
	.delete(require(ROLE.SUPER_ADMIN), GenreController.removeGenre);

export default router;
