import { UserRepository } from "../Repository/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create(email, passwordHash);

    return { id: user.id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      throw new Error("Invalid email or password");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: "1h" }
    );

    return { token };
  }
}