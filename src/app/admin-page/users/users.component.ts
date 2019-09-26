import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {SharedServiceService} from "../../services/shared-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { NgxSmartModalService } from 'ngx-smart-modal';
import {Router} from "@angular/router";
import {IUser} from "../../models/iuser";
import {IRole} from "../../models/irole";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  rows: IUser[] = [];
  roles;
  flag = false;


  title = 'Angular Concepts Tutorials - Input & Output';
  appleDescription = ['kjj', 'hjh', 'kkj', 'fdg', 'dfd'];

  constructor(private usersService: UsersService,
              private sharedService: SharedServiceService,
              public ngxSmartModalService: NgxSmartModalService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('')
    });
    // this.usersService.getUsers().subscribe((data: any) => {
    //   this.rows = data;
    //   this.flag = true;
    // });
    this.usersService.getUsersByPagination(0, 5).subscribe((data: IUser[])=>{
      console.log(data);
      this.rows = data;
      console.log(this.rows);
    });
    this.usersService.getRoles().subscribe((data: IRole[]) => {
      this.roles = data;
    });
  }

  addUser() {
    console.log(this.form.value);
    this.usersService.register(this.form.get('firstName').value, this.form.get('lastName').value, this.form.get('email').value, this.form.get('password').value, this.form.get('role').value).subscribe((data: any) => {
      this.rows.push(data);
      // this.usersService.getUsers().subscribe((data: IUser[]) => {
      //   this.rows = data;
      //   this.form.reset();
      // })
    })
    console.log(this.rows);
  }

  goToAddProduct() {
    this.router.navigate(['/admin']);
  }

}
