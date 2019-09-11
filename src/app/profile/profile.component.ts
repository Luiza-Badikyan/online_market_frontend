import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {__await} from "tslib";
import {ProductsService} from "../services/products.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  users;
  user;
  products;
  info;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private cartService: CartService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {

    // if (localStorage.getItem('role') === 'user') {
    //   this.user = this.usersService.getUser();
    // }

    this.cartService.getUserInfo().subscribe((data) => {
      this.info = data;
      console.log(this.info);
      console.log(this.info.user);
    });


  }

  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
    localStorage.clear();
  }

  // addInfo() {
  //   console.log('OK');
  //
  // }


}
