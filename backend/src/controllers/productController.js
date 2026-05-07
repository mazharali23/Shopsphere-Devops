import { StatusCodes } from "http-status-codes";
import { ok } from "../utils/apiResponse.js";
import { AppError } from "../utils/errors.js";
import { getProductById, listProducts } from "../models/productModel.js";

export async function listProductsController(req, res) {
  const { page, limit } = req.query;
  const { items, total } = await listProducts({ page, limit });
  const pages = Math.ceil(total / limit);
  return ok(res, items, { page, limit, total, pages });
}

export async function getProductController(req, res) {
  const product = await getProductById(req.params.id);
  if (!product) {
    throw new AppError("Product not found", { statusCode: StatusCodes.NOT_FOUND, code: "PRODUCT_NOT_FOUND" });
  }
  return ok(res, product);
}

