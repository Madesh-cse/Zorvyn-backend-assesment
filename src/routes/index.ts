import Router from "express";
import userRouter from "./user"
import RecordRouter from "./record";
import DashBoardRouter from "./dashboard";
import authRouter from "./auth";

const appRouter = Router();

appRouter.use("/auth", authRouter )
appRouter.use("/user", userRouter);
appRouter.use("/record", RecordRouter);
appRouter.use("/dashboard", DashBoardRouter);

export default appRouter;