import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userController = {
  createUser: async (req: Request, res: Response) => {
    // receber os dados
    const { name, email, password, role } = req.body;

    // validar os dados

    // método de criação de Tabela User
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      }
    })

    // resposta
    res.status(201).json(newUser);
  },

  getAllUsers: async(req: Request, res: Response) => {
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
  },
  getUserById: async(req: Request, res: Response) => {
    // Receber o ID por params
    const { id } = req.params;

    // Validações

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
  },
  updateUser: async(req: Request, res: Response) => {
    // Receber o ID por params
    const { id } = req.params;
    const { name, email, password, role, userImg } = req.body;

    // Validações

    // Método que atualiza o User pelo ID
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data:{
        name,
        email,
        password,
        role,
        userImg
      }
    });

    // Resposta
    res.status(200).json(updateUser);
  },
  deleteUser: async(req: Request, res: Response) => {
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
  }
};