import { Router } from 'express';
import { userController } from '../controllers/userControllers';
import { userValidations } from '../middlewares/userValidations';

const router = Router();

router.post('/users', 
  userValidations.createUserValidations, 
  userController.createUser);

router.get('/users', userController.getAllUsers);

router.get('/users/:id', 
  userValidations.validateId, 
  userController.getUserById);

router.put('/users/:id', 
  userValidations.validateUpdateUser, 
  userController.updateUser);

router.delete('/users/:id', 
  userValidations.validateId, 
  userController.deleteUser);

export default router;