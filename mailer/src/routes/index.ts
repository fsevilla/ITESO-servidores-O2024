import { Router } from 'express';
import { getAllUsers } from './../controllers/users.controller';
import { sendSampleEmail } from './../controllers/email.controller';

const router = Router();

router.get('', (req, res) => {
    res.send('api works');
});

router.get('/users', getAllUsers);
router.get('/email', sendSampleEmail);

export default router;