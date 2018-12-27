import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SharedService } from '@app/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CanAccessAdminComponentGuard implements CanActivate {

  constructor (private sharedService: SharedService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return !this.sharedService.isUserAuthenticated;
  }
}
