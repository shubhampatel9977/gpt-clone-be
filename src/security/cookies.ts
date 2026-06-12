import { Response } from "express";

const isProduction =
  process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction
    ? ("none" as const)
    : ("lax" as const),
  path: "/",
};

export const setAccessTokenCookie = (
  res: Response,
  token: string
): void => {
  res.cookie("accessToken", token, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
};

export const setRefreshTokenCookie = (
  res: Response,
  token: string
): void => {
  res.cookie("refreshToken", token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookies = (
  res: Response
): void => {
  res.clearCookie("accessToken", {
    ...cookieOptions,
  });

  res.clearCookie("refreshToken", {
    ...cookieOptions,
  });
};
