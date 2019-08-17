import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: any = [];
  hide = true;
  flag = false;
  constructor(private usersService: UsersService, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    })

  }

  login() {
    this.usersService.login(this.loginForm.value).subscribe((data: any) => {
      this.usersService.storeUserData(data.token);
      console.log(data);
      this.authService.login();

      if (localStorage.getItem('role') === 'user') {
        this.router.navigate(['/profile']);
      } if  (localStorage.getItem('role') === 'admin') {
        this.router.navigate(['/admin']);
      }


      //     this.loginForm.reset();
      this.flag = true;
      this.toastr.success('You are login successfully');

    }, err => {
      console.log(err);
      this.toastr.error('Your email or password is incorrect. Please try again', 'Error');
    })
  }

  getErrorEmail() {
    return this.loginForm.get('email').hasError('required') ? 'Field is required' :
      this.loginForm.get('email').hasError('pattern') ? 'Not a valid email address' : '';
  }

  getErrorPassword() {
    return this.loginForm.get('password').hasError('required') ? 'Field is required' : '';
  }



}
