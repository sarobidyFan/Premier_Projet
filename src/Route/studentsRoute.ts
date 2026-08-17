import { Router } from "express";
import { StudentController } from "../Controller/studentController";
import { authMiddleware } from "../Middleware/authMiddleware";

const router = Router();

const studentController = new StudentController();

router.get(
    "/students",
    authMiddleware,
    studentController.getAll
);

router.get(
    "/students/:id",
    authMiddleware,
    studentController.getById
);

router.post(
    "/students",
    authMiddleware,
    studentController.create
);

router.put(
    "/students/:id",
    authMiddleware,
    studentController.update
);

router.delete(
    "/students/:id",
    authMiddleware,
    studentController.delete
);

export default router;