import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uuidParam } from "../../validations/commonValidation.js";
import { createOrderBody } from "../../validations/orderValidation.js";
import { createOrderController, getOrderController, listOrdersController } from "../../controllers/orderController.js";

export const orderRoutes = Router();

orderRoutes.use(requireAuth);

orderRoutes.get("/", asyncHandler(listOrdersController));
orderRoutes.get("/:id", validate({ params: uuidParam }), asyncHandler(getOrderController));
orderRoutes.post("/", validate({ body: createOrderBody }), asyncHandler(createOrderController));

