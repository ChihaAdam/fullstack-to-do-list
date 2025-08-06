import { verifyAccessToken } from "../utils/user.utils.js";
import {Types} from 'mongoose'

export const auth = (req, _, next) => {
  try {
    const sentToken = req.headers.authorization?.split(' ')[1];
    if (!sentToken) {
      const err = new Error("no token provided");
      err.name = "noTokenProvidedError";
      throw err;
    }
    const decoded = verifyAccessToken(sentToken);
    req.id = Types.ObjectId.createFromHexString(decoded.id)
    next();
  } catch (err) {
    next(err);
  }
};
