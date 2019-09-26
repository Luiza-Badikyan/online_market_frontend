import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {IUser} from "../models/iuser";
import {ValidateService} from "../services/validate.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  users: IUser[] = [];
  hide = true;
  flag = false;
  constructor(private usersService: UsersService,
              private toastr: ToastrService,
              private router: Router,
              private validate: ValidateService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\\s]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\\s]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.validate.validatePassword])
    });
    this.usersService.getUsers().subscribe((data: IUser[]) => {
      this.users = data;
    });

  }

  registration() {
    this.flag = true;
    this.usersService.register(this.registerForm.get('firstName').value, this.registerForm.get('lastName').value, this.registerForm.get('email').value, this.registerForm.get('password').value).subscribe((data: IUser) => {
      this.users.push(data);
      // this.registerForm.reset();
      this.toastr.success('Congratulations!!! You are registered successfully');
    }, error => {
      console.log(error);
      this.toastr.error('Something goes wrong. Please try again', 'Error');
    });
    this.router.navigate(['/']);
  }

  getErrorEmail() {
    return this.registerForm.get('email').hasError('required') ? 'Field is required' :
      this.registerForm.get('email').hasError('email') ? 'Not a valid email address' : '';
  }

  getValidationFirstNameError() {
    return this.registerForm.get('firstName').hasError('required') ? 'Field is required' :
      this.registerForm.get('firstName').hasError('pattern') ? 'Not a valid firstName' : '';
  }

  getValidationLastNameError() {
    return this.registerForm.get('lastName').hasError('required') ? 'Field is required' :
      this.registerForm.get('lastName').hasError('pattern') ? 'Not a valid lastName' : '';
  }

  getErrorPassword() {
    return this.registerForm.get('password').hasError('required') ? 'Field is required' : '';
  }


}



