import express, { Express } from "express";
import dotenv from "dotenv";
import { StudentController } from "./Controller/studentController";
import authRoutes from "./Route/authRoutes";
import { authMiddleware } from "./Middleware/authMiddleware";

dotenv.config();

const app: Express = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes d'authentification
app.use("/auth", authRoutes);

const controller = new StudentController();

// Routes Student protégées par JWT
app.get(
    "/students",
    authMiddleware,
    (req, res) => controller.getAll(req, res)
);

app.get(
    "/students/:id",
    authMiddleware,
    (req, res) => controller.getById(req, res)
);

app.post(
    "/students",
    authMiddleware,
    (req, res) => controller.create(req, res)
);

app.put(
    "/students/:id",
    authMiddleware,
    (req, res) => controller.update(req, res)
);

app.patch(
    "/students/:id",
    authMiddleware,
    (req, res) => controller.patch(req, res)
);

app.delete(
    "/students/:id",
    authMiddleware,
    (req, res) => controller.delete(req, res)
);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});