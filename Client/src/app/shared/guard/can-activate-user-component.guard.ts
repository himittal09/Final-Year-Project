import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { SharedService } from '@app/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateUserComponentGuard implements CanActivate {

  constructor (private sharedService: SharedService) {}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
    return this.sharedService.isUserAuthenticated;
  }
}
