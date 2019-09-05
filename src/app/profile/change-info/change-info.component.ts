import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
  // _id;
  // firstName;
  // lastName;
  // email;
  // password;
  form: FormGroup;
  info;
  photo;

  constructor(private route: ActivatedRoute, private cartService: CartService, private usersService: UsersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      // email: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required),
      date: new FormControl(''),
    });


    this.cartService.getUserInfo().subscribe((data) => {
      this.info = data;
      console.log(this.info);
      console.log(this.info.user);
      const token = this.usersService.getUser();
      // this.info.user.password =

    });
    console.log(this.form.value);
}

    handleFileInputInfo(event) {
      this.photo = event.target.files[0];
    }

    change(user) {

      let data;
      if (this.photo) {
        data = new FormData();
        data.append('file', this.photo, this.photo.name);
        Object.keys(this.form.value).forEach(key => {
          data.append(key, this.form.value[key]);
        });

        // console.log(data);
      } else {
        data = this.form.value;
      }


      this.usersService.change(user._id, data).subscribe(() => {
        console.log(user._id);
        console.log(data);
        console.log('OK');
      })

    }
  }
