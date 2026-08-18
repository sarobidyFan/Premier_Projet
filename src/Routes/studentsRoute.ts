import { Router } from "express";
import { StudentController } from "../Controllers/studentController";
import { authMiddleware } from "../security/authMiddleware";

const router = Router();
const studentController = new StudentController();

router.use(authMiddleware);

router.get("/", studentController.getAll);
router.get("/:id", studentController.getById);
router.post("/", studentController.create);
router.put("/:id", studentController.update);
router.patch("/:id", studentController.patch);
router.delete("/:id", studentController.delete);

export default router;