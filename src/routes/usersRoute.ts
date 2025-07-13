import { Router } from "express";
import { registerUser, loginUser } from "../modules/users/userController";
import { validate } from "../middleware/validatorMiddleware";
import { loginValidator, registerValidator } from "../validators/index";

const router = Router();

router.post("/register", validate(registerValidator), registerUser);
router.post("/login", validate(loginValidator), loginUser);

export default router;
