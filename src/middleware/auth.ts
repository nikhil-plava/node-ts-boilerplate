import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { sendErrorResponse } from "../utils/responseUtil";
import { env } from "../config/envConfig";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return sendErrorResponse(
      StatusCodes.UNAUTHORIZED,
      req,
      res,
      {},
      "No token provided"
    );
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      role: string;
    };
    req.user = decoded;

    // Optional: override role from header if needed
    const roleFromHeader = req.headers["x-user-role"];
    if (roleFromHeader && typeof roleFromHeader === "string") {
      req.user.role = roleFromHeader;
    }

    next();
  } catch (err) {
    return sendErrorResponse(
      StatusCodes.UNAUTHORIZED,
      req,
      res,
      {},
      "Invalid or expired token"
    );
  }
};
