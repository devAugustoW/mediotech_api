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
        return;
      }

      // Validar formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Email inválido" });
        return;
      }

      // Validar se email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        res.status(400).json({ error: "Email já cadastrado" });
        return;
      }

      // Validar tamanho da senha
      if (password.length < 5) {
        res.status(400).json({ error: "A senha deve ter no mínimo 5 caracteres" });
        return;
      }

      // Validar role
      const validRoles = ['COORDINATOR', 'TEACHER', 'STUDENT'];
      if (!validRoles.includes(role)) {
        res.status(400).json({ error: "Role inválida. Use: COORDINATOR, TEACHER ou STUDENT"  });
        return;
      }

      next();

    } catch (error) {
      console.error('Erro ao validar usuário', error);
      res.status(500).json({ error: 'Erro ao validar usuário'})
    }
  },
  validateId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Validação se ID é número
      if (isNaN(Number(id))) {
        res.status(400).json({ 
          error: 'ID inválido' 
        });
        return;
      }

      // Validação se usuário existe
      const user = await prisma.user.findUnique({
        where: { id: Number(id) }
      });

      if (!user) {
        res.status(404).json({ 
          error: 'Usuário não encontrado' 
        });
        return;
      }

      next();
      
    } catch (error) {
      console.error('Erro ao validar ID', error);
      res.status(500).json({ error: 'Erro ao validar ID'})
      
    }
  },
  validateUpdateUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Email inválido' });
        return;
      }

      // Validação de email único (exceto para o próprio usuário)
      const existingUser = await prisma.user.findFirst({
        where: { 
          email,
          id: { not: Number(req.params.id) }
        }
      });
      
      if (existingUser) {
        res.status(400).json({ error: 'Email já cadastrado' });
        return;
      }
    }

    if (password && password.length < 5) {
      res.status(400).json({ error: 'A senha deve ter no mínimo 5 caracteres' });
      return;
    }

    if (role) {
      const validRoles = ['COORDINATOR', 'TEACHER', 'STUDENT'];
      if (!validRoles.includes(role)) {
        res.status(400).json({ error: 'Role inválida' });
        return;
      }
    }
    next();
  }
}