import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: any = [];

  constructor(private usersService: UsersService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    })

  }

  login() {
    this.usersService.login(this.loginForm.value).subscribe((data: any) => {
      this.usersService.storeUserData(data.token);
      this.authService.login();
      this.router.navigate(['/profile']);
      //     this.loginForm.reset();

    }, err => {
      console.log(err);
    })
  }



}
