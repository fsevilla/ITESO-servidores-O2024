import { Router } from 'express';
import userRoutes from './users';
const router = Router();

router.get('', (req, res) => {
    res.send('api works!');
})

router.use('/users', userRoutes);

export default router;