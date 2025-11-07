// src/lib/auth.ts
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const ACCESS_EXPIRES = "15m"; // access token lifetime
const REFRESH_EXPIRES = 60 * 60 * 24 * 30; // refresh lifetime in seconds (30 days)
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || (process.env.JWT_SECRET || "change_this_secret"); // can be different

export function createAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

export function createRefreshToken(payload: object) {
  // longer lived refresh token; can use different secret
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_EXPIRES}s` });
}

export function getRefreshCookie(token: string) {
  // httpOnly secure cookie
  const cookie = serialize("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api", // limit to API routes (or "/" if you prefer)
    maxAge: REFRESH_EXPIRES,
  });
  return cookie;
}

export function clearRefreshCookie() {
  return serialize("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api",
    expires: new Date(0),
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as any;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as any;
}
