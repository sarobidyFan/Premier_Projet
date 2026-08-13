import express, { Express } from "express";
import dotenv from "dotenv";
import { StudentController } from "./Controller/studentController";

dotenv.config();

const app: Express = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const controller = new StudentController();

app.get("/students", (req, res) => 
    controller.getAll(req, res)
);

app.get("/students/:id", (req, res) => 
    controller.getById(req, res)
);

app.post("/students", (req, res) => 
    controller.create(req, res)
);

app.put("/students/:id", (req, res) => 
    controller.update(req, res)
);

app.patch("/students/:id", (req, res) => 
    controller.patch(req, res)
);

app.delete("/students/:id", (req, res) => 
    controller.delete(req, res)
);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});