import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { HomeComponent } from './components/home/home.component';

import {
  CanAccessAdminComponentGuard,
  CanAccessUserComponentGuard,
  CanActivateAdminComponentGuard,
  CanActivateUnprotectedComponentGuard,
  CanActivateUserComponentGuard,
  CanDeactivateComponent
} from './guard/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    AboutComponent,
    NavbarComponent,
    RouteNotFoundComponent,
    HomeComponent
  ],
  // providers: [
  //   CanAccessAdminComponentGuard,
  //   CanAccessUserComponentGuard,
  //   CanActivateAdminComponentGuard,
  //   CanActivateUnprotectedComponentGuard,
  //   CanActivateUserComponentGuard,
  //   CanDeactivateComponent
  // ],
  exports: [
    AboutComponent,
    NavbarComponent,
    RouteNotFoundComponent,
    HomeComponent
    // CanAccessAdminComponentGuard,
    // CanAccessUserComponentGuard,
    // CanActivateAdminComponentGuard,
    // CanActivateUnprotectedComponentGuard,
    // CanActivateUserComponentGuard,
    // CanDeactivateComponent
  ]
})
export class SharedModule { }
