import { Router } from "express";
import { registerUser, loginUser } from "../modules/users/userController";
import { loginValidator, registerValidator } from "../validators/index";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);

export default router;
