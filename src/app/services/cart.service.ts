import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


export interface CartItem {
  product: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private http: HttpClient) { }

  saveCart(product, quantity) {
    return this.http.post('http://localhost:3000/watch/cart', {product, quantity});
  }

  getCart(): CartItem[] {
    const cartJson = localStorage.getItem('cart');
    if (!cartJson) {
      return [];
    }

    return JSON.parse(cartJson);
  }

}
