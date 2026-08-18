import jwt from "jsonwebtoken";
import { HttpError } from "./HttpError";

interface JwtPayload {
  userId: number;
  email: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new HttpError(500, "JWT_SECRET is not configured");
  }
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new HttpError(500, "JWT_SECRET is not configured");
  }
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new HttpError(401, "Invalid or expired token");
  }
};