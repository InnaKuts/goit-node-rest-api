import bcrypt from "bcrypt";
import User from "../models/User.js";

async function register(email, password) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription: "starter",
  });

  return {
    email: newUser.email,
    subscription: newUser.subscription,
  };
}

export default {
  register,
};
