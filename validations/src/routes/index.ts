import { Request, Response, Router, json } from 'express';
import { signupValidations } from '../middlewares/signup';
import { validationResult, matchedData, query } from 'express-validator';

const router = Router();

router.get('', (req, res) => {
    res.send('api works!');
})

router.use(json());

router.post('/signup', signupValidations(), (req: Request, res: Response) => {  
    const result = validationResult(req);
    if (result.isEmpty()) {
        const userData = matchedData(req);
        console.log('User data: ', userData);
        res.send(`Hi ${userData.name}`);
    } else {
        res.status(400).send('Invalid user');
    }
})

router.get('/sanitize', query('script').escape(), (req, res) => {
    const sanitizedData = matchedData(req);
    res.send(sanitizedData.script);
});

export default router;