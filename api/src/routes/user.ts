import {
	createUserController,
	deleteUserController,
	getAllUsersController,
	getUserByIdController,
} from "@src/controllers/user";
import { Router } from "express";

const router = Router();

router.route("/").get(getAllUsersController).post(createUserController);
router.route("/:id").get(getUserByIdController).delete(deleteUserController);

export default router;
