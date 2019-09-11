import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  UrlSegment,
  RouterStateSnapshot,
  UrlTree,
  Router, CanActivate, Data
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoadGuardGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('route', route);
    console.log('state', state);
    return this.checkAuth(route.data);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth(route.data);
  }

  checkAuth(data: Data): boolean {
    const isAuth = this.authService.isAuth(data);
    console.log("auth: ", isAuth);
    if (isAuth) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
