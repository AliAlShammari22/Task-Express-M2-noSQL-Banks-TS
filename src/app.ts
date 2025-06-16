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

// app.use((req: Request, res: Response, next: NextFunction) => {
//   const formattedDateTime = new Date().toISOString();
//   console.log(
//     `You recevide a request of type ${req.method} at the enpoint ${req.path}, at ${formattedDateTime}`
//   );
//   next();
// });
app.use(morgan("dev"));
app.use("/accounts", accountsRouter);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
