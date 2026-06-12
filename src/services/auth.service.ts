import { prisma } from "@config/prisma";
import { verifyRefreshToken } from "@utils/jwt";

import {
  RegisterInput,
  LoginInput,
  AuthTokens,
  JwtPayload,
  LoginResponse,
} from "@app-types/auth.types";

import {
  hashPassword,
  comparePassword,
} from "@security/password";

import {
  generateAccessToken,
  generateRefreshToken,
} from "@utils/jwt";

export const registerUser = async (
  payload: RegisterInput
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(
    payload.password
  );

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (
  payload: LoginInput
): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid =
    await comparePassword(
      payload.password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload: JwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken =
    generateAccessToken(jwtPayload);

  const refreshToken =
    generateRefreshToken(jwtPayload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,

      expiresAt: new Date(
        Date.now() +
          7 * 24 * 60 * 60 * 1000
      ),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const logoutUser = async (
  refreshToken: string
) => {
  await prisma.refreshToken.deleteMany({
    where: {
      token: refreshToken,
    },
  });
};

export const refreshUserToken = async (
  refreshToken: string
): Promise<AuthTokens> => {
  const savedToken =
    await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

  if (!savedToken) {
    throw new Error("Invalid refresh token");
  }

  const decoded =
    verifyRefreshToken(refreshToken);

  const accessToken =
    generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

  const newRefreshToken =
    generateRefreshToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

  await prisma.refreshToken.update({
    where: {
      token: refreshToken,
    },
    data: {
      token: newRefreshToken,
      expiresAt: new Date(
        Date.now() +
          7 * 24 * 60 * 60 * 1000
      ),
    },
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const getCurrentUser = async (
  userId: string
) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};
