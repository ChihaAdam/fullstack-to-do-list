import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env.js";

export async function hashUser(username, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return {
    username: username,
    password: hashedPassword,
  };
}
export async function checkPassword(entered, real) {
  try {
    const isMatch = await bcrypt.compare(entered, real);
    return isMatch;
  } catch (err) {
    return false;
  }
}
export function generateAccessToken(id) {
  return (
    "Bearer " + jwt.sign({ id: id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
  );
}

export function generateRefreshToken(id) {
  return (
    "Bearer " + jwt.sign({ id: id }, REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
  );
}
export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      error = {
        name: "invalidAccessTokenError",
        message: "access token invalid",
      };
      throw error;
    }
    return decoded;
  });
}
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      error = {
        name: "invalidRefreshTokenError",
        message: "refresh token invalid",
      };
      throw error;
    }
    return decoded;
  });
}
