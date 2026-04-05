import express from "express"
import { getDashboardSummary } from "../controllers/DashBoardController"
import { AuthorizedRoles } from "../middleware/role";
import { authMiddleware } from "../middleware/authMiddleware";

const DashBoardRouter = express.Router();

DashBoardRouter.get("/summary",  authMiddleware, AuthorizedRoles("viewer", "analyst", "admin"),getDashboardSummary);

export default DashBoardRouter;