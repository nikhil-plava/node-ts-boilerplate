import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import routes from "./routes";
import helmet from "helmet";
import { limiterConfig } from "./config/rateLimitConfig";
// import { throttleConfig } from "./config/throttleConfig.cjs";

const app: Application = express();

// ===== Middleware =====

//rate-limit
app.use(limiterConfig);

//api thorttle
// app.use(throttleConfig);

// Security middleware to set various HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data with extended option
app.use(express.urlencoded({ extended: true }));

// Log HTTP requests in development mode
app.use(morgan("dev"));

// ===== API Routes =====
app.use(env.BASIC_API_URL, routes);

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
