import express, { Express } from "express";
import dotenv from "dotenv";
import authRoutes from "./Route/authRoutes";
import studentRoutes from "./Route/studentsRoute";

dotenv.config();

const app: Express = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/auth", authRoutes);
app.use("/", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});