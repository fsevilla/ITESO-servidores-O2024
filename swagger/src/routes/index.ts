import { Router } from 'express';
import userRoutes from './users';
import signupRoutes from './signup';

const router = Router();




/**
 * @swagger
 * /:
 *  get:
 *   tags: [Default]
 *   description: api home endpoint
 *   responses:
 *    200:
 *     description: success message
 */
router.get('', (req, res) => {
    res.send('api works');
});

router.use('/users', userRoutes);
router.use('/signup', signupRoutes);

export default router;