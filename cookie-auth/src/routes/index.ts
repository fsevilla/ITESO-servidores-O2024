import { Router, json } from 'express';
import cookieParser from 'cookie-parser';
import { sign } from 'jsonwebtoken';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use(json());

router.use(cookieParser(process.env.secretKey));

const mockUsers = [
    { id: '1', name: 'Juan',  email: 'juan@email.com', password: 'hola123', role: 'admin' },
    { id: '2', name: 'Pedro', email: 'pedro@email.com', password: 'hola123', role: 'user' }
];


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
     const user = mockUsers.find((item) => {
        return item.email === email && item.password === password;
     });
     
     if (!user) {
         res.sendStatus(400);
    } else {
        res.cookie('auth', JSON.stringify(user), { signed: true });
        res.send();
     }
});

router.get('/auth', authMiddleware, (req, res) => {
    console.log('User? ', req.user);
    res.send('ok');
});

router.post('/login-token', (req, res) => {
    const { email, password } = req.body;
    
    const user = mockUsers.find((item) => {
       return item.email === email && item.password === password;
    });

    if (!user) {
        res.sendStatus(400);
   } else {
       const secret = process.env.secretKey || '';
       const userData = {
        email: user.email,
        role: user.role,
        id: user.id
       }

       const token = sign(userData, secret);
       res.send({ token })
    }
})


export default router;