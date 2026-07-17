import { Response, CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions: CookieOptions = {
  httpOnly: true,

  /** HTTPS only in production */
  secure: isProduction,

  /** Cross-site cookies */
  sameSite: isProduction ? "none" : "lax",

  /** Available for entire API */
  path: "/",
};

export const setAccessTokenCookie = (
  res: Response,
  token: string
): void => {
  res.cookie("accessToken", token, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};

export const setRefreshTokenCookie = (
  res: Response,
  token: string
): void => {
  res.cookie("refreshToken", token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const clearAuthCookies = (
  res: Response
): void => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
};
