import { StudentRepository } from "../Repository/studentRepository";
import { Student } from "../Model/studentModel";

const studentRepo = new StudentRepository();

export class StudentService {
  async getAllStudents(): Promise<Student[]> {
    return await studentRepo.findAll();
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await studentRepo.findById(id);
    if (!student) {
      throw new Error("Étudiant non trouvé");
    }
    return student;
  }

  async createStudent(data: Omit<Student, "id">): Promise<Student> {
    if (data.age < 0) {
      throw new Error("L'âge doit être valide");
    }
    return await studentRepo.create(data);
  }

  async updateStudent(id: number, data: Omit<Student, "id">): Promise<Student> {
    const updatedStudent = await studentRepo.update(id, data);
    if (!updatedStudent) {
      throw new Error("Étudiant non trouvé pour la mise à jour");
    }
    return updatedStudent;
  }

  async patchStudent(id: number, data: Partial<Omit<Student, "id">>): Promise<Student> {
    const patchedStudent = await studentRepo.partialUpdate(id, data);
    if (!patchedStudent) {
      throw new Error("Étudiant non trouvé pour la mise à jour partielle");
    }
    return patchedStudent;
  }

  async deleteStudent(id: number): Promise<Student> {
    const deletedStudent = await studentRepo.delete(id);
    if (!deletedStudent) {
      throw new Error("Impossible de supprimer : Étudiant non trouvé");
    }
    return deletedStudent;
  }
}