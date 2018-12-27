import { Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserMeComponent } from './user-me/user-me.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

import {
    CanActivateUnprotectedComponentGuard,
    CanAccessUserComponentGuard
} from '@guard/index';

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserMeComponent,
        canActivate: [ CanAccessUserComponentGuard ],
        resolve: []
    },
    {
        path: 'signup',
        component: UserSignupComponent,
        canActivate: [ CanActivateUnprotectedComponentGuard ]
    },
    {
        path: 'login',
        component: UserLoginComponent,
        canActivate: [ CanActivateUnprotectedComponentGuard ]
    }
];
