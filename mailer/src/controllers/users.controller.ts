import { Request, Response } from 'express';
import User from './../types/user';

export function getAllUsers(req: Request, res: Response) {
    const users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@email.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@email.com' }
    ];

    res.send(users);
}
