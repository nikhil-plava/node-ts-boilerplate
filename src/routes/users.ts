import { Router } from "express";
import { getAllUsers } from "../modules/users/controller";

const router = Router();

// GET /users/
router.get("/", getAllUsers);

export default router;
