import { verifyRefreshToken,generateAccessToken } from "../../utils/user.utils.js";

export function refreshToken(req, res, next) {
  try {
    const refreshToken=req.cookies.refreshToken?.split(' ')[1]
    const decoded=verifyRefreshToken(refreshToken)
    const newAccessToken=generateAccessToken(decoded.id)
    res.status(200).json({
        message:"access token refreshed successfully",
        accessToken:newAccessToken
    })
  } catch (err) {
    next(err);
  }
}
