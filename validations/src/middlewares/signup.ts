// import { Request, Response, NextFunction } from 'express';
import { body, query } from 'express-validator';


export function signupValidations() {
    return [
        body('name').notEmpty().escape(),
        body('email').notEmpty().isEmail()
    ]

}
