import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  constructor(message, { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, code = "APP_ERROR", details } = {}) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

