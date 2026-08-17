import { Request, Response } from "express";
import { AuthService } from "../Service/authService";

export class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (
        req: Request,
        res: Response
    ) => {

        try {

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email et mot de passe obligatoires"
                });
            }

            const user = await this.authService.register(
                email,
                password
            );

            return res.status(201).json({
                message: "Utilisateur créé",
                user
            });

        } catch (error) {

            if (
                error instanceof Error &&
                error.message === "Email déjà utilisé"
            ) {
                return res.status(409).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    };


    login = async (
        req: Request,
        res: Response
    ) => {

        try {

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email et mot de passe obligatoires"
                });
            }

            const result = await this.authService.login(
                email,
                password
            );

            return res.status(200).json(result);

        } catch (error) {

            if (
                error instanceof Error &&
                error.message ===
                "Email ou mot de passe incorrect"
            ) {
                return res.status(401).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    };
}