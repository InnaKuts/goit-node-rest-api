import express from "express";
import { register, login } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(register)
);

authRouter.post("/login", validateBody(loginSchema), ctrlWrapper(login));

export default authRouter;
