import { Injectable } from '@angular/core';
import {UsersService} from "./users.service";
import {Data, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  users: any;
  constructor(private usersService: UsersService, private router: Router) { }

  login() {
    this.isLoggedIn = true;
  }
  logout() {
    this.isLoggedIn = false;
  }
  isAuth(data: Data): boolean {
    const user = this.usersService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (data && data.roles) {
      return data.roles.indexOf(user.role) > -1;
    }

    return true;

  }
}
