import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *   tags: [Users]
 *   description: list all users
 *   responses:
 *    200:
 *     description: array of users
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
 *      description: id of the user
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: defails of user
 */
router.get('/:id', (req, res) => {
    res.send({
        id: req.params.id
    })
})

export default router;