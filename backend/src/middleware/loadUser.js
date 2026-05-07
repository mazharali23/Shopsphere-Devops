import { StatusCodes } from "http-status-codes";
import { findUserById } from "../models/userModel.js";

export async function loadUser(req, res, next) {
  const user = await findUserById(req.auth.userId);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "User not found" }
    });
  }
  req.user = user;
  return next();
}

