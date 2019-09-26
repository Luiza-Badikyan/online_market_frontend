import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loader = false;
  button = true;
  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })

  }

  resetPassword() {
    console.log(this.resetForm.value);
    this.usersService.resetPassword(this.resetForm.value).subscribe((response) => {
      console.log(response);
    });
    this.toastr.success('Please, check your email');
    this.button = false;
    this.loader = true;
    if (this.loader === true) {
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 80);
    }
  }


}
