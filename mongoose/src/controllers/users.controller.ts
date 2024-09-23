import { Request, Response } from "express";
import User from './../models/user';
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class UsersController {

    async getAll(req: Request, res: Response) {
        try {
            const users  = await User.find({});
            res.send(users);
        } catch (e) {
            console.log('Server error: ', e);
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }   
    }

}

const controller = new UsersController();

export default controller;
