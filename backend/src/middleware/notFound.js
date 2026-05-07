import { StatusCodes } from "http-status-codes";

export function notFound(_req, res) {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Route not found" }
  });
}

