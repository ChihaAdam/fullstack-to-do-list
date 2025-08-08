import Todo from "../model/todo.model.js";
//addtodo controller
export const addTodo = async (req, res, next) => {
  try {
    const id = req.id;
    await Todo.create({
      title: req.body.title,
      description: req.body.description ?? "",
      author: id,
    });
    res.status(201).json({ message: "todo created successfully" });
  } catch (err) {
    next(err);
  }
};
//get all todos controller
export const getTodos = async (req, res, next) => {
  try {
    const id = req.id;
    const todos = await Todo.find({ author: id });
    const formattedTodos = todos.map((todo) => ({
      ...todo.toObject(), // ensures it's a plain object
      _id: todo._id.valueOf(), // converts ObjectId to string
    }));
    res.status(200).json({
      todos: formattedTodos,
    });
  } catch (err) {
    next(err);
  }
};
export const searchTodo = async (req, res, next) => {
  try {
    const id = req.id;
    const { searchTerm } = req.query;
    const regexSearchTerm = new RegExp("^" + searchTerm);
    const todos = await Todo.find({ title: regexSearchTerm, author: id });
    res.status(200).json({
      todos: todos,
    });
  } catch (err) {
    next(err);
  }
};
export const updateTodo = async (req, res, next) => {
  try {
    const userId = req.id;
    const {id,updates} = req.body;
    const updated = await Todo.findOneAndUpdate(
      {
        _id: id,
        author: userId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) {
      const err = new Error("document not found");
      err.name = "DocumentNotFoundError";
      throw err;
    }
    res.status(200).json({
      message: "todo updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const completeTodo = async (req, res, next) => {
  try {
    const userId = req.id;
    const { id } = req.body;
    const updated = await Todo.findOneAndUpdate(
      {
        _id: id,
        author: userId,
      },
      { $set: { completed: true } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) {
      const err = new Error("document not found");
      err.name = "DocumentNotFoundError";
      throw err;
    }
    res.status(200).json({
      message: "todo updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const deleteTodo = async (req, res, next) => {
  try {
    const userId = req.id;
    const { id } = req.params;
    const deleted = await Todo.findOneAndDelete(
      {
        _id: id,
        author: userId,
      });
    if (!deleted) {
      const err = new Error("document not found");
      err.name = "DocumentNotFoundError";
      throw err;
    }
    res.status(200).json({
      message: "todo updated successfully",
    });
  } catch (err) {
    next(err);
  }
};