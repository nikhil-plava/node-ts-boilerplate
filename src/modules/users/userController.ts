import { Request, Response } from 'express';
import { TUser, TCreateUserBody, TUserLoginBody } from '../../types/userTypes';
import * as userService from './userService';
import { sendErrorResponse, sendSuccessResponse } from '../../utils/responseUtil';
import { StatusCodes } from 'http-status-codes';
import messages from './userMessage';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const body: TUser = req.body;
    const createUserBody: TCreateUserBody = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
      phone: body.phone,
    };
    const user = await userService.registerUser(createUserBody);
    sendSuccessResponse(StatusCodes.CREATED, req, res, user, messages.CREATE_USER_SUCCESS);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    sendErrorResponse(StatusCodes.BAD_REQUEST, req, res, {}, errorMessage);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const createLoginBody: TUserLoginBody = {
      email,
      password,
    };
    const response = await userService.loginUser(createLoginBody);
    sendSuccessResponse(StatusCodes.CREATED, req, res, response, messages.LOGIN_SUCCESS);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    sendErrorResponse(StatusCodes.UNAUTHORIZED, req, res, {}, errorMessage);
  }
};
