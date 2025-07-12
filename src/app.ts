import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/envConfig";
import routes from "./routes";
import helmet from "helmet";
// import { limiterConfig } from "./config/rateLimitConfig";
import connectDB from "./config/dbConfig";
import { globalErrorHandler } from "./middleware/error";

const app: Application = express();

// ===== Middleware =====
// app.use(limiterConfig);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(morgan("dev"));

// ===== API Routes =====
app.use(env.BASIC_API_URL, routes);

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("API is running");
});

// ===== Global Error Handler =====
app.use(globalErrorHandler);

export default app;
