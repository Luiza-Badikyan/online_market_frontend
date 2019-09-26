import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { UsersService } from "../services/users.service";
import { CartService } from "../services/cart.service";
import { Info, IUser } from "../models/iuser";
import {SharedServiceService} from "../services/shared-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: IUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private cartService: CartService,
    private sharedService: SharedServiceService) { }

  get userFlag(): boolean {
    return this.sharedService.userFlag
  }
  get loginFlag(): boolean {
    return this.sharedService.loginFlag;
  }

  ngOnInit() {

    this.cartService.getUserInfo().subscribe((data: IUser) => {
      this.user = data;
    });

  }

  logout() {
    this.sharedService.profileVisibility();
    this.sharedService.loginVisibility();
    this.router.navigate(['/']);
    this.authService.logout();
    localStorage.clear();
  }

}
