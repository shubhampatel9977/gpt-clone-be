import jwt from "jsonwebtoken";
import { JwtPayload } from "@app-types/common.types";


export const generateAccessToken = (
  payload: JwtPayload
): string => {

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY!;

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

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY!;

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

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;

  return jwt.verify(
    token,
    accessTokenSecret
  ) as JwtPayload;
};

export const verifyRefreshToken = (
  token: string
): JwtPayload => {

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

  return jwt.verify(
    token,
    refreshTokenSecret
  ) as JwtPayload;
};
