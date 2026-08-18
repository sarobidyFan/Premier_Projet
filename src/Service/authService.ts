import { UserRepository } from "../Repository/userRepository";
import bcrypt from "bcrypt";
import { generateToken } from "../security/jwt";
import { HttpError } from "../security/HttpError";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpError(409, "Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create(email, passwordHash);

    return { id: user.id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpError(401, "Invalid email or password");
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      throw new HttpError(401, "Invalid email or password");
    }

    const token = generateToken({ userId: user.id, email: user.email });

    return { token };
  }
}