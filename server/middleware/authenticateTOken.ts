import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers['x-auth'];
    
    if (!token) {
        return res.status(401).send({message: 'No auth tokken provided'});
    }

    jwt.verify(token, process.env.SESSION_KEY, (error: jwt.JsonWebTokenError, decoded: Object) => {
        if (error) {
            return res.status(500).send(error);
        }
        
        res.locals = decoded;
        next();
    });
};

export const signJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = jwt.sign({}, process.env.SESSION_KEY, {
        expiresIn: 1000*60*20,
        issuer: ''
    });
    // req.res.locals
    req.res.locals = token;
    next();
};