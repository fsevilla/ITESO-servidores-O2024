import { Router, json } from 'express';
import cookieParser from 'cookie-parser';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use(json());

const mockUsers = [
    { name: 'John Doe', email: 'test@email.com', password: 'hola123', role: 'user' },
    { name: 'John Admin', email: 'admin@email.com', password: 'hola123', role: 'admin' }
];

router.use(cookieParser('12345'));

router.get('', (req, res) => {
    res.send('api works!');
})

router.get('/test', authMiddleware, (req, res) => {
    console.log('Req user?',req.user);
    const name = req.user?.name;
    res.send(`Welcome ${name}`);
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const found = mockUsers.find(item => {
        return email === item.email && password === item.password
    });

    if (found) {
        res.cookie('user', JSON.stringify(found), { signed: true });
        res.send('Success');
    } else {
        res.sendStatus(400);
    }

});

export default router;