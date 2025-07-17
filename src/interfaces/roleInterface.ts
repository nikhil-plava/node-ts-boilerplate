import mongoose from "mongoose";
import { TRoles } from "../types/roleType";

export interface IRole {
  _id?: mongoose.Types.ObjectId;
  roleName: TRoles;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
