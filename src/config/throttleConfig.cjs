import throttle from "express-throttle";
import { RequestHandler } from "express";

export const throttleConfig = throttle({
  burst: 5, // max 5 requests at once
  period: "1s", // within 1 second
});
