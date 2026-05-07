import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/errors.js";

export function errorHandler(err, _req, res, _next) {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

  const payload = {
    success: false,
    error: {
      code: isAppError ? err.code : "INTERNAL_SERVER_ERROR",
      message: isAppError ? err.message : "Something went wrong"
    }
  };

  if (isAppError && err.details) payload.error.details = err.details;

  if (process.env.NODE_ENV !== "production" && !isAppError) {
    payload.error.details = { name: err?.name, message: err?.message, stack: err?.stack };
  }

  res.status(statusCode).json(payload);
}

