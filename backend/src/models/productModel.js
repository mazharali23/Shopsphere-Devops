import { pool } from "../config/db.js";

export async function listProducts({ page, limit }) {
  const offset = (page - 1) * limit;
  const { rows } = await pool.query(
    `SELECT id, sku, name, description, price_cents, currency, image_url, inventory_count, is_active, created_at, updated_at
     FROM products
     WHERE is_active = true
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const countRes = await pool.query(`SELECT COUNT(*)::int AS count FROM products WHERE is_active = true`);
  return { items: rows, total: countRes.rows[0].count };
}

export async function getProductById(id) {
  const { rows } = await pool.query(
    `SELECT id, sku, name, description, price_cents, currency, image_url, inventory_count, is_active, created_at, updated_at
     FROM products
     WHERE id = $1 AND is_active = true`,
    [id]
  );
  return rows[0] || null;
}

