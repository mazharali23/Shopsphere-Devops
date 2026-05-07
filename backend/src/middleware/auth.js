import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const [type, token] = auth.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Missing Bearer token" }
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.auth = { userId: decoded.sub, role: decoded.role, email: decoded.email };
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Invalid or expired token" }
    });
  }
}

