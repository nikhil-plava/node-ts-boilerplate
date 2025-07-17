import mongoose, { Schema } from "mongoose";
import { IRole } from "../interfaces/roleInterface";

const roleSchema = new Schema<IRole>(
  {
    roleName: {
      type: String,
      enum: ["admin", "manager", "staff"],
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRole>("Role", roleSchema);
