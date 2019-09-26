import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('http://localhost:3000/watch');
  }

  getCategories() {
    return this.http.get('http://localhost:3000/watch/categories');
  }

  addProduct1(product) {
    return this.http.post('http://localhost:3000/watch', product);
  }

  addProduct(newTitle, newSlug, newImage, newDescription, newCategory) {
    const product = {
      "title": newTitle,
      "slug": newSlug,
      "image": newImage,
      "description": newDescription,
      "category": newCategory
    };
    return this.http.post('http://localhost:3000/watch', product);
  }

  deleteProduct(product) {
    return this.http.delete(`http://localhost:3000/watch/${product.title}`);
  }
  changeProduct(productId: string, newProduct: object) {
    return this.http.put('http://localhost:3000/watch/'+productId, newProduct);
  }


}
