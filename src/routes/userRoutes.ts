import { Router } from 'express';
import { userController } from '../controllers/userControllers';

const router = Router();

// POST - Criar um novo usuário
router.post('/users', userController.createUser);

// GET - Listar todos os usuários
router.get('/users', userController.getAllUsers);

// GET - Buscar usuário por ID
router.get('/users/:id', userController.getUserById);

// PUT - Atualizar usuário
router.put('/users/:id', userController.updateUser);

// DELETE - Deletar usuário
router.delete('/users/:id', userController.deleteUser);

export default router;