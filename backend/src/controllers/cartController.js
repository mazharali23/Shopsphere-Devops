import { ok } from "../utils/apiResponse.js";
import { getCartItems, removeCartItem, upsertCartItem } from "../models/cartModel.js";

export async function getCartController(req, res) {
  const items = await getCartItems(req.auth.userId);
  const totals = items.reduce(
    (acc, item) => {
      acc.quantity += item.quantity;
      acc.subtotal_cents += item.quantity * item.price_cents;
      return acc;
    },
    { quantity: 0, subtotal_cents: 0, currency: items[0]?.currency || "USD" }
  );

  return ok(res, { items, totals });
}

export async function upsertCartController(req, res) {
  const { productId, quantity } = req.body;
  await upsertCartItem({ userId: req.auth.userId, productId, quantity });
  const items = await getCartItems(req.auth.userId);
  return ok(res, { items });
}

export async function removeCartItemController(req, res) {
  await removeCartItem({ userId: req.auth.userId, productId: req.params.productId });
  const items = await getCartItems(req.auth.userId);
  return ok(res, { items });
}

