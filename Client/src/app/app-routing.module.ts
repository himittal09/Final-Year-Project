import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './shared/components/home/home.component';
import { AboutComponent } from './shared/components/about/about.component';
import { RouteNotFoundComponent } from './shared/components/route-not-found/route-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'exam', loadChildren: './exam/exam.module#ExamModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'about', component: AboutComponent },
  { path: '**', component: RouteNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
