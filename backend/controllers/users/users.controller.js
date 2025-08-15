import User from "../../model/user.model.js";
import Todo from "../../model/todo.model.js";
import {
  hashUser,
  generateAccessToken,
  checkPassword,
  generateRefreshToken,
} from "../../utils/user.utils.js";
import { dbConnection } from "../../config/dbConnection.js";
import { IS_PRODUCTION } from "../../config/env.js";
import bcrypt from "bcrypt";
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
      httpOnly: IS_PRODUCTION,
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
        httpOnly: IS_PRODUCTION,
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
//signout controller
export const signoutController = (_req, res, _next) => {
  res
    .status(200)
    .clearCookie("refreshToken", {
      httpOnly: IS_PRODUCTION,
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? "None" : "Lax",
    })
    .json({
      message: "signed out successfully",
    });
};
//delete user controller
export const deleteUserController = async (req, res, next) => {
  const id = req.id;
  try {
    await User.findOneAndDelete({ _id: id });
    await Todo.deleteMany({ author: id });
    res
      .status(200)
      .clearCookie("refreshToken", {
        httpOnly: IS_PRODUCTION,
        secure: IS_PRODUCTION,
        sameSite: IS_PRODUCTION ? "None" : "Lax",
      })
      .json({
        message: "user removed successfull",
        id: id,
      });
  } catch (err) {
    next(err);
  }
};
export const updateUserController = async (req, res, next) => {
  try {
    await dbConnection();
    const id = req.id;
    let newInfo = req.body;
    if (newInfo.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newInfo.password, salt);
      newInfo = { ...newInfo, password: hashedPassword };
    }
    const updated = await User.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: newInfo },
      {
        runValidators: true,
      }
    );
    if (!updated) {
      const err = new Error("document not found");
      err.name = "DocumentNotFoundError";
      throw err;
    }
    res.status(200).json({
      message: "user info updated successfully",
      id: id,
    });
  } catch (err) {
    next(err);
  }
};
export const getUserInfoController = async (req, res, next) => {
  try {
    await dbConnection();
    const id = req.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      const err = new Error("document not found");
      err.name = "DocumentNotFoundError";
      throw err;
    }
    res.status(200).json({
      message: "user info retrieved successfully",
      info: {
        username: user.username,
      }
    });
  } catch (err) {
    next(err);
  }
};
