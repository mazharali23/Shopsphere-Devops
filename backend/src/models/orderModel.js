import { pool } from "../config/db.js";

export async function listOrders(userId) {
  const { rows } = await pool.query(
    `SELECT id, status, total_cents, currency, shipping_address, created_at, updated_at
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

export async function getOrderWithItems({ userId, orderId }) {
  const orderRes = await pool.query(
    `SELECT id, user_id, status, total_cents, currency, shipping_address, created_at, updated_at
     FROM orders
     WHERE id = $1 AND user_id = $2`,
    [orderId, userId]
  );
  const order = orderRes.rows[0] || null;
  if (!order) return null;

  const itemsRes = await pool.query(
    `SELECT id, product_id, product_name_snapshot, unit_price_cents, quantity, created_at, updated_at
     FROM order_items
     WHERE order_id = $1
     ORDER BY created_at ASC`,
    [orderId]
  );

  return { order, items: itemsRes.rows };
}

