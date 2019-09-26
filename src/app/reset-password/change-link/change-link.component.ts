import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from "../../services/users.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-link',
  templateUrl: './change-link.component.html',
  styleUrls: ['./change-link.component.css']
})
export class ChangeLinkComponent implements OnInit {
  resetPassword: FormGroup;
  token:any;
  loader = false;
  button = true;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetPassword = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  save() {
    console.log('OK');
    this.route.queryParams.subscribe((params: Params)=>{
      const email = params.email;
      const token = params.token;
      console.log(email);
      console.log(token);
      this.usersService.changePass(this.resetPassword.value, params).subscribe(()=>{
        console.log('--- OK ---');
        this.toastr.success('Your password has changed successfully');
          this.button = false;
          this.loader = true;
          if (this.loader === true) {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 80);
          }
      })
    });
    console.log('addddd');
  }

}
