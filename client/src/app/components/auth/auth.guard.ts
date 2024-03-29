import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> | Promise<boolean> {
    return this.authService.user.pipe(
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        console.log('AUTH GUARD RUNNING');
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
