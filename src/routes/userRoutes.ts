import { Router } from 'express';
import { userController } from '../controllers/userControllers';
import { userValidations } from '../middlewares/userValidations';

const router = Router();

router.post('/users', userValidations.createUserValidations, userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;