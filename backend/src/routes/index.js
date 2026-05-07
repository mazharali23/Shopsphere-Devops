import { Router } from "express";
import { authRoutes } from "./v1/authRoutes.js";
import { productRoutes } from "./v1/productRoutes.js";
import { cartRoutes } from "./v1/cartRoutes.js";
import { orderRoutes } from "./v1/orderRoutes.js";
import { userRoutes } from "./v1/userRoutes.js";

export const router = Router();

// v1 routes
router.get("/v1", (_req, res) => res.json({ name: "ShopSphere API", version: "v1" }));
router.use("/v1/auth", authRoutes);
router.use("/v1/products", productRoutes);
router.use("/v1/cart", cartRoutes);
router.use("/v1/orders", orderRoutes);
router.use("/v1/users", userRoutes);

