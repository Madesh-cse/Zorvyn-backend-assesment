import express from "express"
import { CreateRecord } from "../controllers/recordController";
import { getAllRecords } from "../controllers/recordController";
import { UpdateRecord } from "../controllers/recordController";
import { deleteRecord } from "../controllers/recordController";
import { AuthorizedRoles } from "../middleware/role";
import { authMiddleware } from "../middleware/authMiddleware";

const RecordRouter = express.Router();

RecordRouter.post("/createRecord", authMiddleware,  AuthorizedRoles("admin"), CreateRecord);
RecordRouter.get("/getRecord", authMiddleware, AuthorizedRoles("analyst", "admin"),getAllRecords);
RecordRouter.patch("/:id/updateRecord", authMiddleware, AuthorizedRoles("admin"), UpdateRecord);
RecordRouter.delete("/:id/deleteRecord", authMiddleware, AuthorizedRoles("admin"), deleteRecord)
export default RecordRouter