import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-change-products',
  templateUrl: './change-products.component.html',
  styleUrls: ['./change-products.component.css']
})
export class ChangeProductsComponent implements OnInit {

  form: FormGroup;
  change: FormGroup;
  products: any = [];
  categories: any = [];

  constructor(private productsService: ProductsService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });

    this.change = new FormGroup({
      title: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });

    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.productsService.getCategories().subscribe((data) => {
      this.categories = data;
    });

  }

  add() {
    this.productsService.addProduct(this.form.get('title').value, this.form.get('slug').value, this.form.get('image').value, this.form.get('description').value, this.form.get('category').value).subscribe((data) => {
      this.products.push(data);
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
        this.form.reset();
      });
    })
  }

  loadProduct(product) {
    this.change.patchValue(product);
  }

  delete(product) {
    console.log(product);
    this.productsService.deleteProduct(product).subscribe(() => {
      // TODO: remove item from products
      this.products = [...this.products.filter(item => item._id !== product._id)];
      // this.productsService.getProducts().subscribe((data) => {
      //   this.products = data;
      // })
    });
  }

  saveChanges(product) {
    this.productsService.changeProduct(product._id, this.change.value).subscribe(() => {
      this.change.reset();
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
        this.toastr.success('Your changes are successfully done.');
      });
    }, (err) => {
      this.toastr.error('Something went wrong. Try again', 'Error');
    });

  }

}
