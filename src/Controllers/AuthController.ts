import { Request, Response } from "express";
import { AuthService } from "../Service/authService";
import { HttpError } from "../security/HttpError";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new HttpError(400, "Email and password are required");
      }
      const user = await this.authService.register(email, password);
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new HttpError(400, "Email and password are required");
      }
      const result = await this.authService.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, err: any) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}