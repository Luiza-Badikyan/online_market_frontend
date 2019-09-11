import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.email)
    })

  }

  resetPassword() {
    // const user_id = localStorage.getItem('userId');
    // console.log('aaaa');
    console.log(this.resetForm.value);
    this.usersService.resetPassword(this.resetForm.value).subscribe((response) => {
      console.log(response);
    });
  }


}
