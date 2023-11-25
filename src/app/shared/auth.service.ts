import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser: any;

  constructor() { }
  login(user: any) {
    // Your existing login logic here
    // Once logged in, set the user details
    this.loggedInUser = user;
  }
  logout() {
    // Your logout logic here
    this.loggedInUser = null;
  }
  
}
