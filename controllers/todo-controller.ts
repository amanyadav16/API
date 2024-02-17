import { v4 as uuidv4 } from "uuid";
import Todo from "../models/todo";
import { Request, Response } from 'express';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

export const addTodo = async (req :Request, res: Response) => {
  const uuid = uuidv4();

  const todo = new Todo({
    todoId: uuid,
    task: req.body.task,
    createdTime: Date.now(),
    updatedTime: "",
    completedTime: "",
    isCompleted: false,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOne({ todoId: req.params.todoId });

    const updatedFields = req.body.task
      ? {
          task: req.body.task,
          updatedTime: Date.now().toString(),
        }
      : {
          isCompleted: req.body.isCompleted,
          completedTime: Date.now().toString(),
        };

    const updatedTodo = await Todo.findByIdAndUpdate(todo?.id, updatedFields, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deleteLog = await Todo.deleteOne({
      todoId: req.params.todoId,
    });
    res.json({ message: "Record deleted successfully", result: deleteLog });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};
