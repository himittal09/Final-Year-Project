import { Request, Response } from 'express';
import pick from 'lodash/pick';
import User from '../../models/User';

export let userSignup = function (request: Request, response: Response)
{
    if (request.session.isAuthenticated)
    {
        return response.status(405).send();
    }

    let body = pick(request.body, ['firstName', 'lastName', 'middleName', 'phoneNumber', 'email', 'address', 'studentClass', 'password']);

    let user = new User(body);

    user.save().then(() => {
        request.session.isAuthenticated = true;
        request.session.userId = user._id;
        request.session.userLevel = 1;
        response.send(user);
    }).catch((error: Error) => response.status(503).send(error));
}

export let userLogin = function (request: Request, response: Response)
{
    if (request.session.isAuthenticated)
    {
        return response.status(405).send();
    }

    let body = pick(request.body, ['email', 'password']);

    User.findByCredentials(body).then((user) => {
        request.session.isAuthenticated = true;
        request.session.userId = user._id;
        request.session.userLevel = 1;
        response.send(user);
    }).catch((error: Error) => response.status(503).send(error));
}

export let userLogout = function (request: Request, response: Response)
{
    request.session.destroy((error: Error) => {
        if (error)
        {
            return response.status(500).send(error);
        }

        response.send();
    });
}

export let userMe = function (request: Request, response: Response)
{
    response.send(request.user);
}

export let userEmail = function (request: Request, response: Response)
{
    User.find({email: request.body.email}).count((error: Error, userCount: number) => {
        if (error || (userCount > 0))
        {
            return response.send({found: true});
        }
        response.send({found: false});
    });
}

export let authStatus = function (request: Request, response: Response)
{
    if (!request.session.isAuthenticated)
    {
        return response.send({authStatus: 2});
    }

    if (request.session.userLevel === 0)
    {
        return response.send({authStatus: 0});
    }

    if (request.session.userLevel === 1)
    {
        return response.send({authStatus: 1});
    }

    response.status(500).send();
}
