import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

// Interface Request para incluir o user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
        role: string;
      }
    }
  }
};

export const authMiddleware = {
  // Middleware para verificar se o usuário está autenticado
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    try {
      // Pegar o token do header da requisição
      const authHeader = req.headers.authorization;

      // Validar Header
      if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      // Extrair token
      const token = authHeader.replace('Bearer ', '');
      
      // Verificar token
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token inválido' });
        }

        // Add informações do usuário na requisição
        req.user = decoded as any;

        next();
      });

    } catch (error) {
      console.error('Erro na autenticação:', error);
      return res.status(500).json({ error: 'Erro na autenticação' });
    }
  },

};