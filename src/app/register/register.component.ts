import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  users: any = [];
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });

  }

  registration() {
    this.usersService.register(this.registerForm.get('firstName').value, this.registerForm.get('lastName').value, this.registerForm.get('email').value, this.registerForm.get('password').value).subscribe((data) => {
      this.users.push(data);
      this.registerForm.reset();
    })
  }


}



