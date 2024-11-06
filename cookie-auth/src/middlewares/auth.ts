import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isSigned = req.signedCookies['auth'];

    if (isSigned) {
        req.user = JSON.parse(isSigned);
        next();
    } else {
        res.sendStatus(401);
    }
}

export default authMiddleware;