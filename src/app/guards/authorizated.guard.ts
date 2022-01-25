import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(): boolean {
    if (this.authenticationService.getCurrentUser()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
