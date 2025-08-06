import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 4,
    maxLength: 16,
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minLength: 6,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
