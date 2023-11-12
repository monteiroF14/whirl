import * as UserController from "controllers/user";
import { Router } from "express";

const router = Router();

router.route("/").get(UserController.getAll).post(UserController.create);
router.route("/:id").get(UserController.getFromId).delete(UserController.remove);

export default router;
