import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { dbHealthcheck } from "./config/db.js";

async function main() {
  const app = createApp();

  try {
    await dbHealthcheck();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Database connection failed:", e?.message || e);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`ShopSphere backend listening on :${env.PORT}`);
  });
}

main();

