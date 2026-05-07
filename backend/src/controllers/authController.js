import { ok, created } from "../utils/apiResponse.js";
import { register, login } from "../services/authService.js";

export async function registerController(req, res) {
  const result = await register(req.body);
  return created(res, result);
}

export async function loginController(req, res) {
  const result = await login(req.body);
  return ok(res, result);
}

export async function logoutController(_req, res) {
  // Stateless JWT: client discards token
  return ok(res, { message: "Logged out" });
}

export async function meController(req, res) {
  return ok(res, { user: req.user });
}

