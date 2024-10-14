import { Router } from 'express';
import userRoutes from './users';

const router = Router();

/**
 * @swagger
 * /:
 *  get:
 *   tags: [Default]
 *   description: api home endpoint
 *   responses:
 *    200:
 *     description: api successful message
 */
router.get('', (req, res) => {
    res.send('api works!');
})

router.use('/users', userRoutes);

export default router;
