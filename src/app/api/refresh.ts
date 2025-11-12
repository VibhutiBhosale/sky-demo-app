import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
  getRefreshCookie,
  clearRefreshCookie,
} from "../../lib/auth";

interface RefreshPayload {
  sub: string;
  email?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ ok: false, message: "No refresh token" });
    }

    // ✅ Use `unknown` and safe type narrowing
    let payload: unknown;
    try {
      payload = verifyRefreshToken(token);
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : "Invalid token error");
      res.setHeader("Set-Cookie", clearRefreshCookie());
      return res.status(401).json({ ok: false, message: "Invalid refresh token" });
    }

    // ✅ Safe check before using payload
    if (
      !payload ||
      typeof payload !== "object" ||
      !("sub" in payload) ||
      typeof (payload as RefreshPayload).sub !== "string"
    ) {
      res.setHeader("Set-Cookie", clearRefreshCookie());
      return res.status(401).json({ ok: false, message: "Invalid refresh token payload" });
    }

    const { sub: userId } = payload as { sub: string };

    const user = await User.findById(userId);
    if (!user) {
      res.setHeader("Set-Cookie", clearRefreshCookie());
      return res.status(401).json({ ok: false, message: "User not found" });
    }

    // ✅ Issue new tokens
    const accessToken = createAccessToken({
      sub: user._id.toString(),
      email: user.email,
    });
    const newRefreshToken = createRefreshToken({
      sub: user._id.toString(),
      email: user.email,
    });

    // ✅ Rotate refresh cookie
    res.setHeader("Set-Cookie", getRefreshCookie(newRefreshToken));

    return res.json({
      ok: true,
      token: accessToken,
      user: {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unexpected error");
    res.setHeader("Set-Cookie", clearRefreshCookie());
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}
