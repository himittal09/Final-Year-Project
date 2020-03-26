import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { IUserDocument } from '../models/interfaces';

export function authenticate (request: Request, response: Response, next: NextFunction) {
    if (!request.session.isAuthenticated) {
        return response.status(401).send();
    }

    User.findById(request.session.userId).then((user: IUserDocument) => {
        request['user'] = user;
        next();
    }, (error) => response.status(501).send(error));
}