import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './shared/components/home/home.component';

import { USER_ROUTES } from '@app/user/user-routing.module';
import { ADMIN_ROUTES } from '@app/admin/admin-routing.module';

import { AboutComponent } from './shared/components/about/about.component';
import { RouteNotFoundComponent } from './shared/components/route-not-found/route-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent, children: USER_ROUTES },
  { path: 'exam', loadChildren: './exam/exam.module#ExamModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'about', component: AboutComponent },
  { path: '**', component: RouteNotFoundComponent }
];
// component: AdminComponent, children: ADMIN_ROUTES
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
