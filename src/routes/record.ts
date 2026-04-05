import express from "express"
import { CreateRecord } from "../controllers/recordController";
import { getAllRecords } from "../controllers/recordController";
import { UpdateRecord } from "../controllers/recordController";
import { deleteRecord } from "../controllers/recordController";
import { AuthorizedRoles } from "../middleware/role";
import { authMiddleware } from "../middleware/authMiddleware";

const RecordRouter = express.Router();

/**
 * @swagger
 * /record/createRecord:
 *   post:
 *     summary: Create a new record
 *     tags: [Record]
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
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Record created successfully
 *       400:
 *         description: Bad request
 */
RecordRouter.post("/createRecord", authMiddleware, AuthorizedRoles("admin"), CreateRecord);

/**
 * @swagger
 * /record/getRecord:
 *   get:
 *     summary: Get all records
 *     tags: [Record]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records
 *       401:
 *         description: Unauthorized
 */
RecordRouter.get("/getRecord", authMiddleware, AuthorizedRoles("analyst", "admin"), getAllRecords);

/**
 * @swagger
 * /record/{id}/updateRecord:
 *   patch:
 *     summary: Update a record
 *     tags: [Record]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       404:
 *         description: Record not found
 */
RecordRouter.patch("/:id/updateRecord", authMiddleware, AuthorizedRoles("admin"), UpdateRecord);

/**
 * @swagger
 * /record/{id}/deleteRecord:
 *   delete:
 *     summary: Delete a record
 *     tags: [Record]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         description: Record not found
 */
RecordRouter.delete("/:id/deleteRecord", authMiddleware, AuthorizedRoles("admin"), deleteRecord);

export default RecordRouter