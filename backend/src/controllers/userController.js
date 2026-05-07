import { ok } from "../utils/apiResponse.js";

export async function getProfileController(req, res) {
  return ok(res, req.user);
}

