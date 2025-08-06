import mongoose from "mongoose";
const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    description: {
      type: String,
      default: "",
      maxLength: 500,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
