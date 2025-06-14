import { Router } from 'express';
import { loginController } from '../controllers/loginController';

const router = Router();

// Rota de login
router.post('/login', loginController.login);

export default router;