import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getCartController, removeCartItemController, upsertCartController } from "../../controllers/cartController.js";
import { removeCartParams, upsertCartBody } from "../../validations/cartValidation.js";

export const cartRoutes = Router();

cartRoutes.use(requireAuth);

cartRoutes.get("/", asyncHandler(getCartController));
cartRoutes.put("/items", validate({ body: upsertCartBody }), asyncHandler(upsertCartController));
cartRoutes.delete("/items/:productId", validate({ params: removeCartParams }), asyncHandler(removeCartItemController));

