import { Router } from "express";
import { StudentController } from "../Controller/studentController";
import { authMiddleware } from "../Middleware/authMiddleware";

const router = Router();
const studentController = new StudentController();

router.use(authMiddleware);

router.get("/students", studentController.getAll);
router.get("/students/:id", studentController.getById);
router.post("/students", studentController.create);
router.put("/students/:id", studentController.update);
router.patch("/students/:id", studentController.patch);
router.delete("/students/:id", studentController.delete);

export default router;