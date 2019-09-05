import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import * as jwtdecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }
  authToken;
  user: any;
  getUsers() {
    return this.http.get('http://localhost:3000/user');
  }
  register(newFirstName, newLastName, newEmail, newPassword) {
    const user = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword
    };
    return this.http.post('http://localhost:3000/user/register', user);
  }

  login(user) {
    return this.http.post('http://localhost:3000/user/login', user)
  }

  change(userId: string, newUser: object) {
    return this.http.put('http://localhost:3000/user/'+userId, newUser);
  }

  updatePassword(newUser: object) {
    return this.http.put('http://localhost:3000/user/update_password', newUser);
  }

  ///////////// ??? /////////////


  storeUserData(token,) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
    const tokenDecoded = jwtdecode(token);
    const {email, userId, role} = tokenDecoded;
    this.user = {email, userId, role};
    localStorage.setItem('role', this.user.role);
    localStorage.setItem('userId', this.user.userId);
  }

  getUser() {
    const idToken = localStorage.getItem('id_token');
    if(!idToken) return false;

    const token = idToken.split(' ')[1];
    const tokenDecoded = jwtdecode(token);
    // const {email, userId, role} = tokenDecoded;
    //     // return {email, userId, role};
    const {firstName, lastName, email, userId, role, cart} = tokenDecoded;
    return {firstName, lastName, email, userId, role, cart};
  }



  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
