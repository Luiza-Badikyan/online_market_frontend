import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Params, Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { UsersService } from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  paramsReceived: Subject<boolean> = new Subject();
  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Observable(subscriber => {
      const params = next.queryParams;
      console.log('email ---',params.email);
      this.usersService.checkToken(params).pipe(
        // map(res => res),
        // first()
      ).subscribe((res) => {
        console.log('res-------------------', res);
        subscriber.next(true)
      }, () => {
        this.router.navigate(['/reset_password']);
        subscriber.next(false);
      })

    });
  }
}
