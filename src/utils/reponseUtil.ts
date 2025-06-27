import { Response } from "express";

export const sendErrorResponse = (
  res: Response,
  error: any,
  statusCode: number = 500,
  defaultMessage: string = "Internal Server Error"
): void => {
  const message = error?.message || defaultMessage;
  res.status(statusCode).json({ success: false, error: message });
};

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  statusCode: number = 200
): void => {
  res.status(statusCode).json({ success: true, data });
};
