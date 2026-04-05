import express from "express"
import { CreateUser } from "../controllers/userController"
import { getAllUser } from "../controllers/userController";
import { updateUser } from "../controllers/userController";
import { updateUserStatus } from "../controllers/userController";
import { deleteUser } from "../controllers/userController";
import { AuthorizedRoles } from "../middleware/role";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
    "/create",
    authMiddleware,
    AuthorizedRoles("admin"),
    CreateUser
);

/**
 * @swagger
 * /user/getuser:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get(
    "/getuser",
    authMiddleware,
    AuthorizedRoles("admin"),
    getAllUser
);

/**
 * @swagger
 * /user/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User role updated successfully
 */
router.patch(
    "/:id/role",
    authMiddleware,
    AuthorizedRoles("admin"),
    updateUser
);

/**
 * @swagger
 * /user/{id}/status:
 *   patch:
 *     summary: Update user status
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User status updated successfully
 */
router.patch(
    "/:id/status",
    authMiddleware,
    AuthorizedRoles("admin"),
    updateUserStatus
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete(
    "/:id",
    authMiddleware,
    AuthorizedRoles("admin"),
    deleteUser
);

export default router;