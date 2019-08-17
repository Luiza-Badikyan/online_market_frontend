import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ProductsService} from "../services/products.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import { FileUploader } from 'ng2-file-upload';

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

  handleFileInput(event) {
    this.productFile = event.target.files[0];
  }

  // uploadFileToActivity() {
  //   this.productsService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // upload() {
  //   this.productsService.uploadImage(this.form.get('image').value).subscribe((data) => {
  //     this.fileToUpload = data;
  //   })
  // }

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

    this.productsService.addProduct1(data).subscribe((result) => console.log(result) );

    // this.productsService.addProduct(this.form.get('title').value, this.form.get('slug').value, this.form.get('image').value, this.form.get('description').value, this.form.get('category').value).subscribe((data) => {
    //   this.products.push(data);
    //   this.productsService.getProducts().subscribe((data) => {
    //     this.products = data;
    //     this.form.reset();
    //   });
    // })
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


  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
    localStorage.clear();
  }





}
