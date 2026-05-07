import { StatusCodes } from "http-status-codes";
import { ok, created } from "../utils/apiResponse.js";
import { AppError } from "../utils/errors.js";
import { listOrders, getOrderWithItems } from "../models/orderModel.js";
import { createOrderFromCart } from "../services/orderService.js";

export async function listOrdersController(req, res) {
  const orders = await listOrders(req.auth.userId);
  return ok(res, orders);
}

export async function getOrderController(req, res) {
  const result = await getOrderWithItems({ userId: req.auth.userId, orderId: req.params.id });
  if (!result) {
    throw new AppError("Order not found", { statusCode: StatusCodes.NOT_FOUND, code: "ORDER_NOT_FOUND" });
  }
  return ok(res, result);
}

export async function createOrderController(req, res) {
  const order = await createOrderFromCart({ userId: req.auth.userId, shippingAddress: req.body.shippingAddress });
  return created(res, order);
}

