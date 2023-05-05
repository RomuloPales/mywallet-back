import { Router } from "express";
import { signUp, signin } from "../controllers/authControllers.js";
import { signinSchemaValidation, userSchemaValidation } from "../middlewares/authValidationMiddleware.js";

const router = Router();

router.post("/sign-up", userSchemaValidation, signUp)
router.post("/sign-in", signinSchemaValidation, signin)


export default router;