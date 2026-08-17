import { Request, Response } from "express";
import { AuthService } from "../Service/authService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required"
        });
      }
      const user = await this.authService.register(email, password);
      return res.status(201).json({
        message: "User created successfully",
        user
      });
    } catch (error) {
      console.error(error);
      if (
        error instanceof Error &&
        (error.message === "Email déjà utilisé" || error.message === "Email already in use")
      ) {
        return res.status(409).json({
          message: "Email already in use"
        });
      }
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required"
        });
      }
      const result = await this.authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message === "Email ou mot de passe incorrect" || error.message === "Invalid email or password")
      ) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  };
}