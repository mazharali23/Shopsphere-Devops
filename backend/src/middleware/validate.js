import { StatusCodes } from "http-status-codes";

export function validate({ body, query, params } = {}) {
  return (req, res, next) => {
    const errors = {};

    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) errors.body = parsed.error.flatten();
      else req.body = parsed.data;
    }

    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) errors.query = parsed.error.flatten();
      else req.query = parsed.data;
    }

    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) errors.params = parsed.error.flatten();
      else req.params = parsed.data;
    }

    if (Object.keys(errors).length) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Invalid request", details: errors }
      });
    }

    return next();
  };
}

