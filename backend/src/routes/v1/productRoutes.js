import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { paginationQuery, uuidParam } from "../../validations/commonValidation.js";
import { getProductController, listProductsController } from "../../controllers/productController.js";

export const productRoutes = Router();

productRoutes.get("/", validate({ query: paginationQuery }), asyncHandler(listProductsController));
productRoutes.get("/:id", validate({ params: uuidParam }), asyncHandler(getProductController));

