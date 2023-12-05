import { Router } from "express";
import * as GenreController from "../controllers/genre";
import { authorize } from "../middleware/authorize";
import { PERMISSIONS } from "../config/permissions";

const router = Router();

router
	.route("/")
	.post(authorize([PERMISSIONS.QUIZ_CREATE_GENRE]), GenreController.create)
	.get(authorize([PERMISSIONS.QUIZ_READ_ALL]), GenreController.getAll);

router
	.route("/:id")
	// .get(authorize([PERMISSIONS.]))
	.put(authorize([PERMISSIONS.QUIZ_CREATE_GENRE]), GenreController.updateName)
	.delete(authorize([PERMISSIONS.QUIZ_DELETE_GENRE]), GenreController.remove);

export default router;
