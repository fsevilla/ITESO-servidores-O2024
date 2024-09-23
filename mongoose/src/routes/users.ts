import { Router } from 'express';
import usersController from './../controllers/users.controller';
const router = Router();

router.get('', usersController.getAll);

export default router;