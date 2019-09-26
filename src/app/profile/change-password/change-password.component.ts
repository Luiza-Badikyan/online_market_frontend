import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;
  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.changePassword = new FormGroup({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  saveNewPassword() {
    const user_id = localStorage.getItem('userId');
    const data = this.changePassword.value;
    data.user_id = user_id;
    this.usersService.updatePassword(data).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/profile']);
    })
  }

  getErrorPassword() {
    return this.changePassword.get('password').hasError('required') ? 'Field is required' : '';
  }
  getColorPass() {
    if (this.changePassword.get('password').invalid && this.changePassword.get('password').touched) return true;
  }

  getErrorNewPassword() {
    return this.changePassword.get('newPassword').hasError('required') ? 'Field is required' : '';
  }
  getColorNewPass() {
    if (this.changePassword.get('newPassword').invalid && this.changePassword.get('newPassword').touched) return true;
  }

  getErrorConfirmPassword() {
    // return this.changePassword.get('confirmPassword').hasError('required') ? 'Field is required' : '';
    return this.changePassword.get('confirmPassword').hasError('required') ? 'Field is required' :
      this.changePassword.get('newPassword').value !== this.changePassword.get('confirmPassword').value ? 'Your newPassword & confirmPassword are not equal' : '';
  }
  getColorConfirmPass() {
    if ((this.changePassword.get('confirmPassword').invalid || this.changePassword.get('newPassword').value !== this.changePassword.get('confirmPassword').value) && this.changePassword.get('confirmPassword').touched) return true;
  }

}
