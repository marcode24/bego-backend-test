import bcrypt from 'bcrypt';

export class User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static create(name: string, email: string, password: string): User {
    const user = new User(name, email, password, new Date(), new Date());
    return user;
  }
}
