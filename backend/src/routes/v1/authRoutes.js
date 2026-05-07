import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { loginBody, registerBody } from "../../validations/authValidation.js";
import { loginController, logoutController, meController, registerController } from "../../controllers/authController.js";
import { requireAuth } from "../../middleware/auth.js";
import { loadUser } from "../../middleware/loadUser.js";

export const authRoutes = Router();

authRoutes.post("/register", validate({ body: registerBody }), asyncHandler(registerController));
authRoutes.post("/login", validate({ body: loginBody }), asyncHandler(loginController));
authRoutes.post("/logout", asyncHandler(logoutController));
authRoutes.get("/me", requireAuth, asyncHandler(loadUser), asyncHandler(meController));

