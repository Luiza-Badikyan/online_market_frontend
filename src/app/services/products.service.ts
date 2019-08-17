import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

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


  // uploadImage(image) {
  //   return this.http.post('http://localhost:3000/watch/upload', image);
  // }



  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.http
  //     .post(endpoint, formData,)
  //     .map(() => { return true; })
  //     .catch((e) => console.log(e));
  // }

}
