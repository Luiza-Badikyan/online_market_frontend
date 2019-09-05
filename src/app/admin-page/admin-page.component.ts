import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ProductsService} from "../services/products.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {


  form: FormGroup;
  change: FormGroup;
  products: any = [];
  categories: any = [];
  productFile: File;
  changeFile: File;

  constructor(private productsService: ProductsService, private http: HttpClient, private toastr: ToastrService, private userService: UsersService, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      // image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });

    this.change = new FormGroup({
      title: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      // image: new FormControl('', Validators.required),
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

  handleFileInput(event) {
    this.productFile = event.target.files[0];
  }


  add() {
    let data;
    if (this.productFile) {
      data = new FormData();
      data.append('file', this.productFile, this.productFile.name);
      Object.keys(this.form.value).forEach(key => {
        data.append(key, this.form.value[key]);
      });

      console.log(data);
    } else {
      data = this.form.value;
    }

    this.productsService.addProduct1(data).subscribe((result) => {
      console.log(result);
      this.products.push(result);
      this.productsService.getProducts().subscribe((data) => {
            this.products = data;
            this.form.reset();
          });
    });
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

  loadProduct(product) {
    this.change.patchValue(product);
  }

  handleFileInput1(event) {
    this.changeFile = event.target.files[0];
  }




  saveChanges(product) {
    let data;
    if (this.changeFile) {
      data = new FormData();
      data.append('file', this.changeFile, this.changeFile.name);
      Object.keys(this.change.value).forEach(key => {
        data.append(key, this.change.value[key]);
      });

      console.log(data);
    } else {
      data = this.change.value;
    }

    this.productsService.changeProduct(product._id, data).subscribe(() => {
      // this.change.reset();
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
        this.toastr.success('Your changes are successfully done.');
      });
    }, (err) => {
      this.toastr.error('Something went wrong. Try again', 'Error');
    });

  }



  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
    localStorage.clear();
  }


}
