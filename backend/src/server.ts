import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import TableRouter from "./routes/TableRouter";

dotenv.config();

const PORT = process.env.PORT ?? 1025;
const MONGO_DB_URL =
  process.env.MONGO_DB_URL ?? "mongodb://localhost:27017/smart_serve";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/table", TableRouter);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.error("Error while connecting to Mongo DB", err));

app.listen(PORT, () => {
  console.log("Listening on Port:", PORT);
});
