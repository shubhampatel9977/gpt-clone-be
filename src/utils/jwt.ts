import jwt from "jsonwebtoken";
import { JwtPayload } from "@app-types/auth.types";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY!;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY!;

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry as jwt.SignOptions["expiresIn"],
    }
  );
};

export const generateRefreshToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiry as jwt.SignOptions["expiresIn"],
    }
  );
};

export const verifyAccessToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    accessTokenSecret
  ) as JwtPayload;
};

export const verifyRefreshToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    refreshTokenSecret
  ) as JwtPayload;
};
