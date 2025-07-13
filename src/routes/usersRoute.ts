import { Router } from "express";
import { registerUser, loginUser } from "../modules/users/userController";
import { validate } from "../middleware/validatorMiddleware";
import * as userValidator from "../validators/userValidators";

const router = Router();

router.post(
  "/register",
  validate(userValidator.registerValidator),
  registerUser
);
router.post("/login", validate(userValidator.loginValidator), loginUser);

export default router;
