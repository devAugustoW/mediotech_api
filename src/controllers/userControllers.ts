import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { passwordHashUtil } from "../util/passwordHashUtil";

const prisma = new PrismaClient();

export const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      // receber os dados
      const { name, email, password, role } = req.body;

      // Criptografar a senha antes de salvar
      const hashedPassword = await passwordHashUtil.hashPassword(password);

      // método de criação de Tabela User
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        }
      })

      // Resposta 
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
      
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      res.status(500).json({ error: 'Erro ao criar usuário'})
    }    
  },

  getAllUsers: async(req: Request, res: Response) => {
    try {
      // Método que busca todos os Users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        userImg: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Resposta
    res.status(200).json(users)
    } catch (error) {
      console.log('Erro ao buscar todos os usuários', error);
      res.status(500).json({ error: 'Erro ao buscar todos os usuários'})
      
    }
    
  },

  getUserById: async(req: Request, res: Response) => {
    try {
      // Receber o ID por params
      const { id } = req.params;

      // Método que busca User pelo ID
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id)
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          userImg: true,
          createdAt: true,
          updatedAt: true
        }
      })

      // Resposta 
      res.status(200).json(user)

    } catch (error) {
      console.log('erro ao buscar usuário por id', error);
      res.status(500).json({ erro: 'erro ao buscar usuário por id' })
      
    }
  },

  updateUser: async(req: Request, res: Response) => {
    try {
      // Receber o ID por params
      const { id } = req.params;
      const { name, email, password, role, userImg } = req.body;

      // Preparar os dados para atualização
      const updateData: any = {
        name,
        email,
        role,
        userImg
      };

      // Se houver nova senha
      if (password) {
        updateData.password = await passwordHashUtil.hashPassword(password);
      }

      // Método que atualiza o User pelo ID
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          userImg: true,
          createdAt: true,
          updatedAt: true
        }
      });

      // Resposta
      res.status(200).json(updateUser);

    } catch (error) {
      console.log('Erro ao atualizar usuário', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário'})
      return;
    }
    
  },

  deleteUser: async(req: Request, res: Response) => {
    try {
      // Receber o Id por Params
      const { id } = req.params;

      // Validações

      // Método que deleta o User pelo ID
      const deleteUser = await prisma.user.delete({
        where: {
          id: parseInt(id)
        }
      });

      // resposta
      res.status(200).json(deleteUser);

    } catch (error) {
      console.log('Erro ao deletar usuário', error);
      res.status(500).json({ error: 'Erro ao deletar usuário'})
      return;
    }
   
  }
};