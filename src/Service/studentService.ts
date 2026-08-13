import { StudentRepository } from "../Repository/studentRepository";
import { Etudiant } from "../Model/studentModel";

const studentRepo = new StudentRepository();

export class StudentService {
  async getAllStudents(): Promise<Etudiant[]> {
    return await studentRepo.findAll();
  }

  async getStudentById(id: number): Promise<Etudiant> {
    const student = await studentRepo.findById(id);
    if (!student) {
      throw new Error("Étudiant non trouvé");
    }
    return student;
  }

  async createStudent(data: Omit<Etudiant, "id">): Promise<Etudiant> {
    // Vous pouvez ajouter ici des validations métier (ex: vérifier l'âge)
    if (data.age < 0) {
      throw new Error("L'âge doit être valide");
    }
    return await studentRepo.create(data);
  }

  async updateStudent(id: number, data: Omit<Etudiant, "id">): Promise<Etudiant> {
    const updatedStudent = await studentRepo.update(id, data);
    if (!updatedStudent) {
      throw new Error("Étudiant non trouvé pour la mise à jour");
    }
    return updatedStudent;
  }

  async patchStudent(id: number, data: Partial<Omit<Etudiant, "id">>): Promise<Etudiant> {
    const patchedStudent = await studentRepo.partialUpdate(id, data);
    if (!patchedStudent) {
      throw new Error("Étudiant non trouvé pour la mise à jour partielle");
    }
    return patchedStudent;
  }

  async deleteStudent(id: number): Promise<Etudiant> {
    const deletedStudent = await studentRepo.delete(id);
    if (!deletedStudent) {
      throw new Error("Impossible de supprimer : Étudiant non trouvé");
    }
    return deletedStudent;
  }
}