import express, { Express } from "express";
import dotenv from "dotenv";
import { StudentController } from "./Controller/studentController";

dotenv.config();

const app: Express = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const controller = new StudentController();

app.get("/etudiants", (req, res) => 
    controller.getAll(req, res)
);

app.get("/etudiants/:id", (req, res) => 
    controller.getById(req, res)
);

app.post("/etudiants", (req, res) => 
    controller.create(req, res)
);

app.put("/etudiants/:id", (req, res) => 
    controller.update(req, res)
);

app.patch("/etudiants/:id", (req, res) => 
    controller.patch(req, res)
);

app.delete("/etudiants/:id", (req, res) => 
    controller.delete(req, res)
);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});