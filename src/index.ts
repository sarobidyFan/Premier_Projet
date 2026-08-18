import express, { Express } from "express";
import dotenv from "dotenv";
import corsMiddleware from "./configuration/cors";

import authRoutes from "./Routes/authRoutes";
import studentRoutes from "./Routes/studentsRoute";

dotenv.config();

const app: Express = express();

app.use(corsMiddleware);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});