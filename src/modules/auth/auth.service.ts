import { prisma } from "@config/prisma";
import { verifyRefreshToken } from "@utils/jwt";
import {
  hashPassword,
  comparePassword,
} from "@security/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@utils/jwt";
import { JwtPayload } from "@app-types/common.types";
import { googleClient } from "@security/googleAuthService";
import {
  RegisterInput,
  LoginInput,
  AuthTokens,
  LoginResponse,
} from "./auth.types";



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

  if (!user.password) {
    throw new Error(
      "This account uses Google login. Please continue with Google."
    );
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

export const googleLogin = async (
  token: string
): Promise<LoginResponse> => {

    const ticket =
      await googleClient.verifyIdToken({
        idToken: token,
        audience:
          process.env.GOOGLE_CLIENT_ID,
      });

    const payload =
      ticket.getPayload();

    if (!payload?.email) {
      throw new Error(
        "Invalid Google token"
      );
    }

    const email =
      payload.email;

    const name =
      payload.name ?? "User";

    const providerId =
      payload.sub;

    let user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {

      user =
        await prisma.user.create({
          data: {
            name,
            email,
            provider: "GOOGLE",
            providerId,
          },
        });
    }  else if (!user.providerId) {

      user =
        await prisma.user.update({
          where: {
            id: user.id,
          },

          data: {
            providerId,
          },
        });
    }

    const jwtPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      generateAccessToken(
        jwtPayload
      );

    const refreshToken =
      generateRefreshToken(
        jwtPayload
      );

    await prisma.refreshToken.create({
      data: {
        token:
          refreshToken,

        userId:
          user.id,

        expiresAt:
          new Date(
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
