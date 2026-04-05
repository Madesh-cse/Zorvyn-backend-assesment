import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import appRouter from "./routes";
import { apiLimiter } from "./middleware/rateLimiter";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", apiLimiter);
app.use("/api", appRouter);

export default app