import authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authService.register(email, password);

  if (!user) {
    return next(HttpError(409, "Email in use"));
  }

  res.status(201).json({ user });
};
