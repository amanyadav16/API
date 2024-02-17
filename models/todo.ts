import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  todoId: {
    type: String,
  },
  task: {
    type: String,
  },
  createdTime: {
    type: String,
  },
  updatedTime: {
    type: String,
  },
  completedTime: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
  },
});

export default model("todo", todoSchema, "Todos"); //pass collection name here
