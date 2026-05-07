import { StatusCodes } from "http-status-codes";
import { pool } from "../config/db.js";
import { AppError } from "../utils/errors.js";

export async function createOrderFromCart({ userId, shippingAddress }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const cartRes = await client.query(
      `SELECT ci.product_id, ci.quantity, p.name, p.price_cents, p.currency, p.inventory_count
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = $1
       FOR UPDATE`,
      [userId]
    );

    const cartItems = cartRes.rows;
    if (cartItems.length === 0) {
      throw new AppError("Cart is empty", { statusCode: StatusCodes.BAD_REQUEST, code: "CART_EMPTY" });
    }

    for (const item of cartItems) {
      if (item.quantity > item.inventory_count) {
        throw new AppError(`Insufficient inventory for ${item.name}`, {
          statusCode: StatusCodes.CONFLICT,
          code: "INSUFFICIENT_INVENTORY",
          details: { productId: item.product_id, available: item.inventory_count, requested: item.quantity }
        });
      }
    }

    const currency = cartItems[0].currency || "USD";
    const totalCents = cartItems.reduce((sum, i) => sum + i.quantity * i.price_cents, 0);

    const orderRes = await client.query(
      `INSERT INTO orders (user_id, status, total_cents, currency, shipping_address)
       VALUES ($1, 'paid', $2, $3, $4::jsonb)
       RETURNING id, user_id, status, total_cents, currency, shipping_address, created_at, updated_at`,
      [userId, totalCents, currency, JSON.stringify(shippingAddress)]
    );
    const order = orderRes.rows[0];

    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, product_name_snapshot, unit_price_cents, quantity)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.product_id, item.name, item.price_cents, item.quantity]
      );

      await client.query(
        `UPDATE products
         SET inventory_count = inventory_count - $1,
             updated_at = now()
         WHERE id = $2`,
        [item.quantity, item.product_id]
      );
    }

    await client.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);

    await client.query("COMMIT");
    return order;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

