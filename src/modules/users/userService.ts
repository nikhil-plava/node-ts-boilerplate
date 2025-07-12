import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { TCreateUserBody, TRoles, TUserLoginBody } from "../../types/userTypes";
import userModel from "../../models/UserModel";
import { generateJWT } from "../../utils/authFunction";

export const registerUser = async (createBody: TCreateUserBody) => {
  const { name, email, password, phone, role } = createBody;
  const existing = await userModel.findOne({ email });
  if (existing) throw new Error("User already exists");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email,
    passwordHash,
    role,
    phone,
  });

  return { name: user.name, email: user.email, role: user.role };
};

export const loginUser = async (
  bodyParams: TUserLoginBody
): Promise<{
  token: string;
  email: string;
  role: TRoles;
  name: string;
  userId: string;
}> => {
  const { email, password } = bodyParams;
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");
  const generatedToken = await generateJWT(user);
  const response: any = {
    token: generatedToken,
    email: user.email,
    role: user.role,
    name: user.name,
    userId: user._id,
  };
  return response;
};
