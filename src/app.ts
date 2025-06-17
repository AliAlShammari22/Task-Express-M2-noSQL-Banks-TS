import express, { Response, Request, NextFunction } from "express";
import accountsRouter from "./api/accounts/accounts.routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 8080;
dotenv.config();
app.use(express.json());

app.use(cors());
// Middleware to log requests

// app.use((req: Request, res: Response, next: NextFunction) => {
//   const formattedDateTime = new Date().toISOString();
//   console.log(
//     `You recevide a request of type ${req.method} at the enpoint ${req.path}, at ${formattedDateTime}`
//   );
//   next();
// });

app.use(morgan("dev"));
app.use("/accounts", accountsRouter);

//404 Error Handler
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json(`This route ${req.path}  does not exist`);
});

//500 Error Handler
app.use("/", (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json(`something went wrong: ${err.message} OMG!`);
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB as string);
    console.log(`MongoDB connected: ${conn.connection.host} successfully`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
