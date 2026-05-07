import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { loadUser } from "../../middleware/loadUser.js";
import { getProfileController } from "../../controllers/userController.js";

export const userRoutes = Router();

userRoutes.use(requireAuth, asyncHandler(loadUser));

userRoutes.get("/me", asyncHandler(getProfileController));

