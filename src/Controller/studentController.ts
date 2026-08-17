import { Request, Response } from "express";
import { StudentService } from "../Service/studentService";

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const students = await this.studentService.getAllStudents();
      return res.status(200).json(students);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID provided" });
      }
      const student = await this.studentService.getStudentById(id);
      return res.status(200).json(student);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newStudent = await this.studentService.createStudent(req.body);
      return res.status(201).json(newStudent);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID provided" });
      }

      const updatedStudent = await this.studentService.updateStudent(id, req.body);
      return res.status(200).json(updatedStudent);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  patch = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID provided" });
      }

      const patchedStudent = await this.studentService.patchStudent(id, req.body);
      return res.status(200).json(patchedStudent);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID provided" });
      }

      const deletedStudent = await this.studentService.deleteStudent(id);
      return res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };
}