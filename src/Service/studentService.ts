import { StudentRepository } from "../Repository/studentRepository";
import { Student } from "../Model/studentModel";

export class StudentService {
  private studentRepo: StudentRepository;

  constructor() {
    this.studentRepo = new StudentRepository();
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepo.findAll();
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentRepo.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }

  async createStudent(data: Omit<Student, "id">): Promise<Student> {
    if (data.age < 0) {
      throw new Error("Age must be valid");
    }
    return await this.studentRepo.create(data);
  }

  async updateStudent(id: number, data: Omit<Student, "id">): Promise<Student> {
    const updatedStudent = await this.studentRepo.update(id, data);
    if (!updatedStudent) {
      throw new Error("Student not found for update");
    }
    return updatedStudent;
  }

  async patchStudent(id: number, data: Partial<Omit<Student, "id">>): Promise<Student> {
    const patchedStudent = await this.studentRepo.partialUpdate(id, data);
    if (!patchedStudent) {
      throw new Error("Student not found for partial update");
    }
    return patchedStudent;
  }

  async deleteStudent(id: number): Promise<Student> {
    const deletedStudent = await this.studentRepo.delete(id);
    if (!deletedStudent) {
      throw new Error("Cannot delete: Student not found");
    }
    return deletedStudent;
  }
}