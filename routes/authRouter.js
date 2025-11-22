import express from "express";
import {
  register,
  login,
  logout,
  getCurrent,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(register)
);

authRouter.post("/login", validateBody(loginSchema), ctrlWrapper(login));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

export default authRouter;
