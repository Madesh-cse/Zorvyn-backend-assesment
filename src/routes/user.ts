import express from "express"
import { CreateUser } from "../controllers/userController"
import { getAllUser } from "../controllers/userController";
import { updateUser } from "../controllers/userController";
import { updateUserStatus } from "../controllers/userController";
import { deleteUser } from "../controllers/userController";
import { AuthorizedRoles } from "../middleware/role";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware,  AuthorizedRoles("admin"), CreateUser);
router.get("/getuser", authMiddleware, AuthorizedRoles("admin"), getAllUser);
router.patch("/:id/role", authMiddleware, AuthorizedRoles("admin"), updateUser);
router.patch("/:id/status",authMiddleware,AuthorizedRoles("admin"),updateUserStatus);
router.delete("/:id",authMiddleware,AuthorizedRoles("admin"),deleteUser);

export default router;