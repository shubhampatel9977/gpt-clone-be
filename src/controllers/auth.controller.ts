import { Request, Response } from "express";

import { AuthenticatedRequest } from "@app-types/request.types";
import {
  registerSchema,
  loginSchema,
} from "@validators/auth.validator";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  getCurrentUser
} from "@services/auth.service";

import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  clearAuthCookies,
} from "@security/cookies";

import {
  apiSuccess,
  apiError,
} from "@utils/apiResponse";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const payload =
      registerSchema.parse(req.body);

    const user = await registerUser(payload);

    return apiSuccess(
      res,
      201,
      "User registered successfully",
      {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    );
  } catch (error) {
    return apiError(
      res,
      400,
      error instanceof Error
        ? error.message
        : "Registration failed"
    );
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const payload =
      loginSchema.parse(req.body);

    const {
      accessToken,
      refreshToken,
      user,
    } = await loginUser(payload);

    setAccessTokenCookie(
      res,
      accessToken
    );

    setRefreshTokenCookie(
      res,
      refreshToken
    );

    return apiSuccess(
      res,
      200,
      "Login successful",
      user,
    );
  } catch (error) {
    return apiError(
      res,
      400,
      error instanceof Error
        ? error.message
        : "Login failed"
    );
  }
};

export const logout = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshToken =
      req.cookies?.refreshToken;

    if (refreshToken) {
      await logoutUser(refreshToken);
    }

    clearAuthCookies(res);

    return apiSuccess(
      res,
      200,
      "Logout successful"
    );
  } catch (error) {
    return apiError(
      res,
      500,
      "Logout failed"
    );
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshTokenCookie =
      req.cookies?.refreshToken;

    if (!refreshTokenCookie) {
      return apiError(
        res,
        401,
        "Refresh token missing"
      );
    }

    const {
      accessToken,
      refreshToken,
    } = await refreshUserToken(
      refreshTokenCookie
    );

    setAccessTokenCookie(
      res,
      accessToken
    );

    setRefreshTokenCookie(
      res,
      refreshToken
    );

    return apiSuccess(
      res,
      200,
      "Token refreshed"
    );
  } catch (error) {
    return apiError(
      res,
      401,
      "Invalid refresh token"
    );
  }
};

export const userInfo = async (
  req: Request,
  res: Response
) => {
  try {

    const authUser = (req as AuthenticatedRequest).user;

    const user = await getCurrentUser(authUser.userId);

    return apiSuccess(
      res,
      200,
      "User fetched successfully",
      user
    );
  } catch (error) {
    return apiError(
      res,
      500,
      "Failed to fetch user"
    );
  }
};
