import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';
import { passwordHashUtil } from '../util/passwordHashUtil';

const prisma = new PrismaClient();

export const loginController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        res.status(400).json({ error: 'Email e senha são obrigatórios' });
        return;
      }
  
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) {
        res.status(401).json({ error: 'Usuário não encontrado' });
        return;
      }
  
      const isPasswordValid = await passwordHashUtil.comparePassword(password, user.password);
  
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Email ou senha inválidos' });
        return;
      }
  
      const token = jwt.sign(
        { 
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        config.jwtSecret,
        { expiresIn: '1d' }
      );
  
      const { password: _, ...userWithoutPassword } = user;

      // Retornar usuário e token
      res.status(200).json({
        user: userWithoutPassword,
        token
      });
      
    } catch (error) {
      console.error('Erro ao fazer login', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
}