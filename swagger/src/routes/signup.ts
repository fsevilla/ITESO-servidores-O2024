import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    required:
 *     - name
 *     - email
 *    properties:
 *     name:
 *      type: string
 *      default: John Doe
 *     email:
 *      type: string
 *      format: email
 */

/**
 * @swagger
 * /signup:
 *  post:
 *   tags: [Auth]
 *   description: User signup
 *   requestBody:
 *    required: true
 *    content: 
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: new user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
router.post('', (req, res) => {
    res.send({});
})



export default router;