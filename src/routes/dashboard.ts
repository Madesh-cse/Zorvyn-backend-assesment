import express from "express"
import { getDashboardSummary } from "../controllers/DashBoardController"
import { AuthorizedRoles } from "../middleware/role";
import { authMiddleware } from "../middleware/authMiddleware";

const DashBoardRouter = express.Router();

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalRecords:
 *                   type: number
 *                 totalRevenue:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, insufficient role
 */
DashBoardRouter.get(
  "/summary",
  authMiddleware,
  AuthorizedRoles("viewer", "analyst", "admin"),
  getDashboardSummary
);

export default DashBoardRouter;