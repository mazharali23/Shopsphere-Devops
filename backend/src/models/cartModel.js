import { pool } from "../config/db.js";

export async function getCartItems(userId) {
  const { rows } = await pool.query(
    `SELECT
        ci.id,
        ci.product_id,
        ci.quantity,
        p.name,
        p.price_cents,
        p.currency,
        p.image_url,
        p.inventory_count
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.user_id = $1
     ORDER BY ci.updated_at DESC`,
    [userId]
  );
  return rows;
}

export async function upsertCartItem({ userId, productId, quantity }) {
  const { rows } = await pool.query(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = EXCLUDED.quantity, updated_at = now()
     RETURNING id, user_id, product_id, quantity, created_at, updated_at`,
    [userId, productId, quantity]
  );
  return rows[0];
}

export async function removeCartItem({ userId, productId }) {
  await pool.query(`DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`, [userId, productId]);
}

export async function clearCart(userId) {
  await pool.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);
}

