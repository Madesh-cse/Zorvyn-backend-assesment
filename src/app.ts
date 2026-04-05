import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import appRouter from "./routes";
import { apiLimiter } from "./middleware/rateLimiter";
import { setupSwagger } from "./config/swagger";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", apiLimiter);
app.use("/api", appRouter);

// Setup Swagger documentation
setupSwagger(app);

export default app