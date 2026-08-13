import { Request, Response } from "express";
import { StudentService } from "../Service/studentService";

const studentService = new StudentService();

export class StudentController {
  async getAll(req: Request, res: Response) {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const student = await studentService.getStudentById(id);
      res.status(200).json(student);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newStudent = await studentService.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updatedStudent = await studentService.updateStudent(id, req.body);
      res.status(200).json(updatedStudent);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async patch(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const patchedStudent = await studentService.patchStudent(id, req.body);
      res.status(200).json(patchedStudent);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deletedStudent = await studentService.deleteStudent(id);
      res.status(200).json({ message: "Étudiant supprimé", etudiant: deletedStudent });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}