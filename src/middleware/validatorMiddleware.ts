import { Request, Response, NextFunction } from "express";
import { ContextRunner } from "express-validator";
import { sendValidationErrorResponse } from "../utils/responseUtil";
import { StatusCodes } from "http-status-codes";

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return sendValidationErrorResponse(
          StatusCodes.BAD_REQUEST,
          res,
          result.array(),
          "validation failed"
        );
      }
    }
    next();
  };
};
