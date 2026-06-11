import { Response } from "express";

const isProduction =
  process.env.NODE_ENV === "production";

export const setAccessTokenCookie = (
  res: Response,
  token: string
): void => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000, // 15 min
  });
};

export const setRefreshTokenCookie = (
  res: Response,
  token: string
): void => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const clearAuthCookies = (
  res: Response
): void => {
  res.clearCookie("accessToken", {
    path: "/",
  });

  res.clearCookie("refreshToken", {
    path: "/",
  });
};
