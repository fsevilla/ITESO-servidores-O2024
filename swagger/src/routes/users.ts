import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *   tags: [Users]
 *   description: get list of users
 *   responses:
 *    200:
 *     description: list of users
 */
router.get('', (req, res) => {
    res.send([]);
})

/**
 * @swagger
 * /users/{id}:
 *  get:
 *   tags: [Users]
 *   description: get one user by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema: 
 *       type: number
 *      required: true
 *      description: user ID
 *   responses:
 *    200:
 *     description: user details
 */
router.get('/:id', (req, res) => {
    res.send({
        id: req.params.id
    });
})

export default router;