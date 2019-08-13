import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  loginForm: FormGroup;
  users: any = [];
  constructor(private router: Router, private usersService: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })

    // this.usersService.getUsers().subscribe((data) => {
    //   this.users = data;
    // })

  }

  login() {
    console.log('came');
    this.usersService.login(this.loginForm.value).subscribe((data: any) => {
      this.usersService.storeUserData(data.token);
      this.authService.login();
      this.router.navigate(['/admin/change']);
      //     this.loginForm.reset();

    }, err => {
      console.log(err);
    })
  }


  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
    localStorage.clear();
    this.loginForm.reset();
  }



}
