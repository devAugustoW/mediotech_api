import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userController = {
  createUser: async (req: Request, res: Response) => {

    // receber os dados

    // validar os dados

    // método de criação de Tabela User

    // resposta

  },

  getAllUsers: async(req: Request, res: Response) => {
    // Receber os dados da chamada que busca todos os Users

    // validações

    // Método que busca todos os Users

    // Resposta
  },
  getUserById: async(req: Request, res: Response) => {
    // Receber o ID por params

    // Validações

    // Método que busca User pelo ID

    // Resposta 
  },
  updateUser: async(req: Request, res: Response) => {},
  deleteUser: async(req: Request, res: Response) => {}
};