import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
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
  user;
  photo;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      date: new FormControl(''),
    });


    this.cartService.getUserInfo().subscribe((data) => {
      this.user = data;
      this.form.patchValue(this.user);
    });
    // console.log('-----------------', this.form.value);
}


    handleFileInputInfo(event) {
      this.photo = event.target.files[0];
    }


    change(user) {
      // console.log('in function', this.form.value);

      let data;
      if (this.photo) {
        data = new FormData();
        data.append('file', this.photo, this.photo.name);
       console.log(data.keys());
        Object.keys(this.form.value).forEach(key => {
          data.append(key, this.form.value[key]);
        });
      } else {
        data = this.form.value;
      }
      // console.log('data', data);


      this.usersService.change(user._id, data).subscribe(() => {
        this.router.navigate(['/profile']);
        // console.log(user._id);
        // console.log(data);
        // console.log('OK');
      })

    }
  }
