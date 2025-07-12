// /middleware/globalErrorHandler.ts
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sendErrorResponse } from "../utils/responseUtil";

// Global error handler
export const globalErrorHandler = (err: Error, req: Request, res: Response) => {
  sendErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, res, err, err.message);
};

export const inValidRoute = (req: Request, res: Response) => {
  const message = `Route ${req.originalUrl} not found`;
  sendErrorResponse(StatusCodes.NOT_FOUND, res, new Error(message), message);
};
