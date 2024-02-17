import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo-controller.js";

const router = Router();

//get Todos
router.get("/", getTodos);

//add todo
router.post("/", addTodo);

//update todo
router.patch("/:todoId", updateTodo);

//delete todo
router.delete("/:todoId", deleteTodo);

export default router;
