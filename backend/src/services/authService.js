import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/errors.js";
import { createUser, findUserByEmail } from "../models/userModel.js";
import { signAccessToken } from "../utils/jwt.js";

const BCRYPT_ROUNDS = 12;

export async function register({ email, password, fullName }) {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AppError("Email already in use", { statusCode: StatusCodes.CONFLICT, code: "EMAIL_TAKEN" });
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const user = await createUser({ email, passwordHash, fullName });

  const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });

  return { user, accessToken };
}

export async function login({ email, password }) {
  const userWithHash = await findUserByEmail(email);
  if (!userWithHash) {
    throw new AppError("Invalid credentials", { statusCode: StatusCodes.UNAUTHORIZED, code: "INVALID_CREDENTIALS" });
  }

  const ok = await bcrypt.compare(password, userWithHash.password_hash);
  if (!ok) {
    throw new AppError("Invalid credentials", { statusCode: StatusCodes.UNAUTHORIZED, code: "INVALID_CREDENTIALS" });
  }

  const user = {
    id: userWithHash.id,
    email: userWithHash.email,
    full_name: userWithHash.full_name,
    role: userWithHash.role,
    created_at: userWithHash.created_at,
    updated_at: userWithHash.updated_at
  };

  const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  return { user, accessToken };
}

