import mongoose from "mongoose";
import User from "../../model/user.model.js";
import {
  hashUser,
  generateAccessToken,
  checkPassword,
  generateRefreshToken,
} from "../../utils/user.utils.js";
import { dbConnection } from "../../config/dbConnection.js";
import { IS_PRODUCTION } from "../../config/env.js";
//login controller
export const loginController = async (req, res, next) => {
  try {
    await dbConnection();
    const { username, password } = req.body;
    const userInfo = await User.findOne({ username: username });
    if (!userInfo) {
      const err = new Error("incorrect username or password");
      err.name = "wrongLoginInfoError";
      throw err;
    }
    const isMatch = await checkPassword(password, userInfo.password);
    if (!isMatch) {
      const err = new Error("incorrect username or password");
      err.name = "wrongLoginInfoError";
      throw err;
    }
    const Accesstoken = generateAccessToken(userInfo._id.valueOf());
    const refreshToken = generateRefreshToken(userInfo._id.valueOf());
    res.status(200).cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? "None" : "Lax",
    });
    res.json({
      message: "logged in successfully",
      accessToken: Accesstoken,
    });
  } catch (err) {
    next(err);
  }
};

//signup controller
export const signupController = async (req, res, next) => {
  let session;
  try {
    await dbConnection();
    const { username, password } = req.body;
    const hashedUser = await hashUser(username, password);
    const newUser = await User.create(hashedUser);
    const id = newUser._id.valueOf();
    const accesstoken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);
    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: IS_PRODUCTION,
        sameSite: IS_PRODUCTION ? "None" : "Lax",
      })
      .json({
        message: "user created successfully",
        accessToken: accesstoken,
      });
  } catch (err) {
    next(err);
  }
};

export const signoutController = (_req, res, _next) => {
  res
    .status(200)
    .clearCookie("refreshToken",{
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: IS_PRODUCTION ? "None" : "Lax",
      })
    .json({
      message: "signed out successfully",
    });
};
