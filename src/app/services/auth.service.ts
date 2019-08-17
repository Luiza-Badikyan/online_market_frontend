import { Injectable } from '@angular/core';
import {UsersService} from "./users.service";
import {Data} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  users: any;
  constructor(private usersService: UsersService) { }

  login() {
    this.isLoggedIn = true;
  }
  logout() {
    this.isLoggedIn = false;
  }
  isAuth(data: Data): boolean {
    const user = this.usersService.getUser();
    if (!user) {
      return false;
    }

    if (data && data.roles) {
      return data.roles.indexOf(user.role) > -1;
    }

    return true;
    //
    // if (data && data.roles) {
    //   const user = this.usersService.getUser();
    //   console.log(user);
    //   if (!user) {
    //     return false;
    //   }
    //
    //
    //   return this.isLoggedIn && data.roles.indexOf(user.role) > -1
    // }

    // return this.isLoggedIn;
  }
}
