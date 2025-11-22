import express from "express";
import { register } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/authSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(register)
);

export default authRouter;
