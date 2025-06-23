import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app: Application = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ===== API Routes =====
app.use(env.BASIC_API_URL, routes);

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
