import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as jwtdecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  authToken;
  user: any;
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`http://localhost:3000/user`);
  }

  getUsersByPagination(page, limit) {
    return this.http.get(`http://localhost:3000/user/pagination?page=${page}&limit=${limit}`);
  }

  register(newFirstName, newLastName, newEmail, newPassword, newRole?: string) {
    const user = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
      role: newRole
    };
    return this.http.post('http://localhost:3000/user/register', user);
  }

  login(user) {
    return this.http.post('http://localhost:3000/user/login', user);
  }

  getRoles() {
    return this.http.get('http://localhost:3000/user/roles');
  }

  deleteUser(userId) {
    return this.http.delete(`http://localhost:3000/user/${userId}`)
  }

  change(userId: string, newUser: object) {
    return this.http.put('http://localhost:3000/user/'+userId, newUser);
  }

  updatePassword(newUser: object) {
    return this.http.put('http://localhost:3000/user/update_password', newUser);
  }

  // Get Reset Password Link
  resetPassword(email) {
    console.log('aaafsf');
    return this.http.post('http://localhost:3000/user/reset_password_link', email);
  }

  // Check Token
  checkToken(params) {
    return this.http.get(`http://localhost:3000/user/reset_password/${params.email}/${params.token}`);
  }

  // Change Password after getting the reset_password_link
  changePass(newPassword, params) {
    return this.http.put(`http://localhost:3000/user/change_token/${params.email}/${params.token}`, newPassword);
  }


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
    // return {email, userId, role};
    const {firstName, lastName, email, userId, role, cart} = tokenDecoded;
    return {firstName, lastName, email, userId, role, cart};
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
