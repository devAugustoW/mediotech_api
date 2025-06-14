import bcrypt from 'bcryptjs';

export const passwordHashUtil = {
  hashPassword: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
  },

  comparePassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  }
}