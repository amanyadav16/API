import todosRouter from "./routes/todo-route";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(
  `${process.env.MONGODB_CONNECTION_STRING}${process.env.DATABASE_NAME}`
);

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/todos", todosRouter);

app.listen(3000, () => {
  console.log("server is running on port: http://localhost:3000");
});
