import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products: any = [];
  users;
  // cart: any = [];

  constructor(private productsService: ProductsService, private router: Router, private usersService: UsersService, private cartService: CartService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    })
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addToBasket(product) {
    // TODO: update local storage
    const cart = this.cartService.getCart();
    const user = this.usersService.getUser();

    let existingProduct = cart.find(item => item.product === product._id);
    // console.log(product._id);
    // console.log(existingProduct);
    // console.log(cart);

    if (!user) {
      if (!existingProduct) {
        cart.push({product: product._id, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        existingProduct.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } else {
      const quantity = existingProduct ? existingProduct.quantity + 1 : 1;
      this.cartService.saveCart(product._id, quantity).subscribe((data) => {
          // user.cart = data;
          user.cart = [];
          user.cart.push(data);
          console.log(user.cart);

          // user.cart.push(data);
          // localStorage.setItem('cart', user.cart);

          // user = this.usersService.getUser();
          // console.log(product._id);
          // console.log(quantity);
          // console.log(data);
          // console.log(user);

        }

        // TODO: get returned cart from user
        // TODO: convert to json
        // TODO: save cart in localStorage
      );
    }
  }

}
