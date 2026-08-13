import { pool } from "./bd";
import { Student } from "../Model/studentModel";

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    const result = await pool.query("SELECT * FROM etudiants");
    return result.rows;
  }

  async findById(id: number): Promise<Student | null> {
    const result = await pool.query(
      "SELECT * FROM etudiants WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async create(studentData: Omit<Student, "id">): Promise<Student> {
    const { first_name, last_name, age } = studentData;
    const result = await pool.query(
      `INSERT INTO etudiants (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *`,
      [first_name, last_name, age]
    );
    return result.rows[0];
  }

  async update(id: number, studentData: Omit<Student, "id">): Promise<Student | null> {
    const { first_name, last_name, age } = studentData;
    const result = await pool.query(
      `UPDATE etudiants SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *`,
      [first_name, last_name, age, id]
    );
    return result.rows[0] || null;
  }

  async partialUpdate(id: number, studentData: Partial<Omit<Student, "id">>): Promise<Student | null> {
    const { first_name, last_name, age } = studentData;
    const result = await pool.query(
      `UPDATE etudiants 
       SET first_name = COALESCE($1, first_name), 
           last_name = COALESCE($2, last_name), 
           age = COALESCE($3, age)
       WHERE id = $4
       RETURNING *`,
      [first_name, last_name, age, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<Student | null> {
    const result = await pool.query(
      `DELETE FROM etudiants WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  }
}