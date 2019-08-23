import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users;
  user;

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    if (localStorage.getItem('role') === 'user') {
      this.user = this.usersService.getUser();
    }

    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });

    console.log(this.user);

    // const userProfileInfo = this.users.find(item => item.userId === this.user.userId);
    // console.log(userProfileInfo.cart);

    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i]._id === )
    // }


    console.log(this.user.email);
    // console.log(this.users);



  }

  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
    localStorage.clear();
  }


}
