import { Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserMeComponent } from './user-me/user-me.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

import { CanActivateUnprotectedComponentGuard } from '../Guards/can-activate-unprotected-component.guard';
import { CanActivateUserComponentGuard } from '../Guards/can-activate-user-component.guard';

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserMeComponent
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
