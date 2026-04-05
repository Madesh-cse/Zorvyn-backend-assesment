import express from "express";
import {RegisterUser} from "../controllers/authController";
import { loginUser } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);
authRouter.post("/login", loginUser);


export default authRouter;