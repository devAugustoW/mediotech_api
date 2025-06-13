import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const userValidations = {
  createUserValidations: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, role } = req.body;

      // Validar campos obrigatórios
      if (!name || !email || !password || !role) {
        res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Validar formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Email inválido" });
      }

      // Validar se email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        res.status(400).json({ error: "Email já cadastrado" });
      }

      // Validar tamanho da senha
      if (password.length < 5) {
        res.status(400).json({ error: "A senha deve ter no mínimo 5 caracteres" });
      }

      // Validar role
      const validRoles = ['COORDINATOR', 'TEACHER', 'STUDENT'];
      if (!validRoles.includes(role)) {
        res.status(400).json({ error: "Role inválida. Use: COORDINATOR, TEACHER ou STUDENT"  });
      }

      next();

    } catch (error) {
      console.error('Erro ao validar usuário', error);
      res.status(500).json({ error: 'Erro ao validar usuário'})
    }
  }
}