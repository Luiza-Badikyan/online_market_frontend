import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  users: any = [];
  hide = true;
  flag = false;
  constructor(private usersService: UsersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\\s]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\\s]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });

  }

  registration() {
    this.flag = true;
    this.usersService.register(this.registerForm.get('firstName').value, this.registerForm.get('lastName').value, this.registerForm.get('email').value, this.registerForm.get('password').value).subscribe((data) => {
      this.users.push(data);
      this.registerForm.reset();
      this.toastr.success('Congratulations!!! You are registered successfully');
    }, error => {
      console.log(error);
      this.toastr.error('Something goes wrong. Please try again', 'Error');
    });
    this.router.navigate(['/']);
  }


}



