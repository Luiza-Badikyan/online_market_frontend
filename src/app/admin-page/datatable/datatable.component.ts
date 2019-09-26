

import { Component, OnInit } from '@angular/core';
import { MockServerResultsService } from "../../services/mock-server-results.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { IRole } from "../../models/irole";
import { NgxSmartModalService } from 'ngx-smart-modal';
import {IProduct} from "../../models/iproduct";
import { Router } from "@angular/router";


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  form: FormGroup;
  change: FormGroup;
  roles: IRole[] = [];
  rows;
  public selectedUser = {};
  temp = [];
  changeFile;

  table;

  columns = [{ name: 'firstName' }, { name: 'lastName' }, { name: 'email' }];

  constructor(private usersService: UsersService,
              private serverResultsService: MockServerResultsService,
              public ngxSmartModalService: NgxSmartModalService,
              public router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('')
    });
    this.change = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      role: new FormControl(''),
      date: new FormControl(''),
    });
    this.usersService.getUsers().subscribe((data: any) => {
      this.rows = data;
      this.temp = data;
    });
    this.usersService.getRoles().subscribe((data: IRole[]) => {
      this.roles = data;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log('val---', val);

    console.log(this.temp);
    const temp = this.temp.filter(function(d) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }


  addUser() {
    console.log(this.form.value);
    this.usersService.register(this.form.get('firstName').value, this.form.get('lastName').value, this.form.get('email').value, this.form.get('password').value, this.form.get('role').value).subscribe((data) => {
      this.rows.push(data);
      this.usersService.getUsers().subscribe((data) => {
        this.rows = data;
        this.form.reset();
      })
    })
  }


  loadProduct(userId) {
    console.log('aaa', userId);
    // this.change.patchValue(user);
    this.change.patchValue(this.rows.find(item => item._id === userId));
    this.ngxSmartModalService.getModal('myChangeModal'+userId).open()
  }

  handleFileInput1(event) {
    this.changeFile = event.target.files[0];
  }



  saveChanges(userId) {
    let data;
    if (this.changeFile) {
      data = new FormData();
      data.append('file', this.changeFile, this.changeFile.name);
      Object.keys(this.change.value).forEach(key => {
        data.append(key, this.change.value[key]);
      });
    } else {
      data = this.change.value;
    }

    this.usersService.change(userId, data).subscribe(() => {
      // this.change.reset();
      // this.productsService.getProducts().subscribe((data: IProduct[]) => {
      //   this.products = data;
      //   this.toastr.success('Your changes are successfully done.');
      // });
    }, (err) => {
      // this.toastr.error('Something went wrong. Try again', 'Error');
    });

  }


  remove(userId) {
    console.log(userId);
    this.usersService.deleteUser(userId).subscribe(() => {
      this.rows = [...this.rows.filter(item => item._id !== userId)];
    });
  }

  goToAddProduct() {
    this.router.navigate(['/admin']);
  }

}
