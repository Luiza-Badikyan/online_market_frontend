import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products: any = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

}
