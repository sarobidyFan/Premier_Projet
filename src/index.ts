import express, { type Request,type Response,type Express, response } from 'express';
import dotenv from 'dotenv';
import { pool } from './Repositore/db';
import { Etudiant } from './Model/types';
import { error } from 'node:console';

dotenv.config();

const app :Express = express();
app.use(express.json());
const PORT = process.env.PORT || 3000 ;

app.get("/etudiants", async (req: Request, res: Response) => {
    const result = await pool.query(
        "SELECT * FROM etudiants"
    );

    res.status(200).json(result.rows);

});

app.get("/etudiants/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await pool.query(
        "SELECT * FROM etudiants WHERE id = $1",
        [id]
    );

    res.status(200).json(result.rows[0]);
});

app.post("/etudiants", async (req: Request, res: Response) => {
    const { first_name, last_name, age } = req.body;
    const result = await pool.query(
        `INSERT INTO etudiants (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *`,
        [first_name, last_name, age]
    );

    res.status(200).json(result.rows[0]);
});

app.put("/etudiants/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { first_name, last_name, age } = req.body;

  const result = await pool.query(
      `UPDATE etudiants SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *`,
      [first_name, last_name, age, id]
  );

  res.status(200).json(result.rows[0]);

});

app.patch("/etudiants/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { first_name, last_name, age } = req.body;

  const result = await pool.query(
      `UPDATE etudiants SET first_name = COALESCE($1, first_name) last_name = COALESCE($2, last_name), age = COALESCE($3, age)
        WHERE id = $4
        RETURNING *`,
      [first_name, last_name, age, id]
  );

  res.status(200).json(result.rows[0]);
});

app.delete("/etudiants/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await pool.query(
      `DELETE FROM etudiants
        WHERE id = $1
        RETURNING *`,
      [id]
  );

  res.status(200).json({
      message: "Étudiant supprimé",
      etudiant: result.rows[0]
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
})
