import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;
  constructor(private usersService: UsersService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.changePassword = new FormGroup({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  saveNewPassword() {
    const user_id = localStorage.getItem('userId');
    const data = this.changePassword.value;
    data.user_id = user_id;

    this.usersService.updatePassword(data).subscribe((response) => {
      console.log(response);
    })
  }

}
