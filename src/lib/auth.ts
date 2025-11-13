import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { serialize } from "cookie";

// =======================================================
// 🔐 Token Configuration
// =======================================================
const ACCESS_EXPIRES = "15m"; // Access token lifetime
const REFRESH_EXPIRES = 60 * 60 * 24 * 30; // Refresh lifetime (30 days)
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || process.env.JWT_SECRET || "change_this_secret";

// =======================================================
// 🧩 Type Definitions
// =======================================================

/**
 * Common JWT payload structure.
 * You can extend this if needed (e.g., add role, permissions).
 */
export interface TokenPayload extends JwtPayload {
  sub: string; // Subject (User ID)
  email: string;
}

// =======================================================
// 🔑 Token Creation Functions
// =======================================================

export function createAccessToken(payload: TokenPayload): string {
  const options: SignOptions = { expiresIn: ACCESS_EXPIRES };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function createRefreshToken(payload: TokenPayload): string {
  const options: SignOptions = { expiresIn: `${REFRESH_EXPIRES}s` };
  return jwt.sign(payload, REFRESH_SECRET, options);
}

// =======================================================
// 🍪 Cookie Helpers
// =======================================================

/**
 * Create secure httpOnly cookie for refresh tokens
 */
export function getRefreshCookie(token: string): string {
  return serialize("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api", // Limit cookie scope to API routes
    maxAge: REFRESH_EXPIRES,
  });
}

/**
 * Clear refresh cookie (used during logout or invalid token)
 */
export function clearRefreshCookie(): string {
  return serialize("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api",
    expires: new Date(0),
  });
}

// =======================================================
// 🧾 Token Verification Functions
// =======================================================

/**
 * Verify an access token and return decoded payload.
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (isTokenPayload(decoded)) {
      return decoded;
    }
    console.warn("verifyAccessToken: invalid token payload structure");
    return null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("verifyAccessToken error:", err.message);
    } else {
      console.error("verifyAccessToken unknown error:", err);
    }
    return null;
  }
}

/**
 * Verify a refresh token and return decoded payload.
 */
export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    if (isTokenPayload(decoded)) {
      return decoded;
    }
    console.warn("verifyRefreshToken: invalid token payload structure");
    return null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("verifyRefreshToken error:", err.message);
    } else {
      console.error("verifyRefreshToken unknown error:", err);
    }
    return null;
  }
}

// =======================================================
// 🧠 Type Guard Helpers
// =======================================================

/**
 * Ensures decoded JWT payload has required fields.
 */
function isTokenPayload(decoded: unknown): decoded is TokenPayload {
  return (
    typeof decoded === "object" &&
    decoded !== null &&
    "sub" in decoded &&
    "email" in decoded &&
    typeof (decoded as Record<string, unknown>).sub === "string" &&
    typeof (decoded as Record<string, unknown>).email === "string"
  );
}
