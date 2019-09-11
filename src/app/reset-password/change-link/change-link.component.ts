import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, UrlSerializer } from '@angular/router';
import { UsersService } from "../../services/users.service";
@Component({
  selector: 'app-change-link',
  templateUrl: './change-link.component.html',
  styleUrls: ['./change-link.component.css']
})
export class ChangeLinkComponent implements OnInit {
  resetPassword: FormGroup;
  token:any;
  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

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
      })
    });
    console.log('addddd');

  }

}
