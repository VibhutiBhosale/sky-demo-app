// src/pages/api/refresh.ts
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import { verifyRefreshToken, createAccessToken, createRefreshToken, getRefreshCookie, clearRefreshCookie } from "../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ ok: false, message: "No refresh token" });
    }
    let payload: any;
    try {
      payload = verifyRefreshToken(token);
    } catch (err) {
      // token invalid
      res.setHeader("Set-Cookie", clearRefreshCookie());
      return res.status(401).json({ ok: false, message: "Invalid refresh token" });
    }

    const userId = payload.sub;
    const user = await User.findById(userId);
    if (!user) {
      res.setHeader("Set-Cookie", clearRefreshCookie());
      return res.status(401).json({ ok: false, message: "User not found" });
    }

    // issue new tokens
    const accessToken = createAccessToken({ sub: user._id.toString(), email: user.email });
    const newRefreshToken = createRefreshToken({ sub: user._id.toString(), email: user.email });

    // set refresh cookie (rotate)
    res.setHeader("Set-Cookie", getRefreshCookie(newRefreshToken));

    return res.json({ ok: true, token: accessToken, user: { _id: user._id.toString(), email: user.email, name: user.name } });
  } catch (err: any) {
    console.error(err);
    res.setHeader("Set-Cookie", clearRefreshCookie());
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}
