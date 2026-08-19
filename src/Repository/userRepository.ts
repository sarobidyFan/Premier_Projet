import { pool } from "../configuration/bd";
import { User } from "../Models/userModel";


export class UserRepository {
    async findByEmail(email: string): Promise<User | null>{
        const result = await pool.query("SELECT id, email, password_hash from users where email = $1", [email]);

        if (result.rows.length===0){return null;}
        return{
            id: result.rows[0].id,
            email: result.rows[0].email,
            passwordHash: result.rows[0].password_hash
        };

    }

    async findById(id: number): Promise<User | null>{
        const result = await pool.query("SELECT id, email, password_hash from users where id = $1", [id]);

        if (result.rows.length===0){return null;}
        return{
            id: result.rows[0].id,
            email: result.rows[0].email,
            passwordHash: result.rows[0].password_hash
        };

    }

    async create(email: string, passwordHash: string): Promise<User>{
        const result = await pool.query(`INSERT INTO users (email, password_hash) values ($1, $2) returning id, email, password_hash`, [email,passwordHash]);

        return{
            id: result.rows[0].id,
            email: result.rows[0].email,
            passwordHash: result.rows[0].password_hash
        };
    }
}