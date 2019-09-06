import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService, private router: Router) { }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);
    //added condition to check if the user is redirected from a specific page or login page
    //if user has directly clicked on login page then redirect it to products page else
    //redirect it to the page from where it was asked to login
    if(this.authService.redirectUrl){
        this.router.navigateByUrl(this.authService.redirectUrl);
    }else{
      this.router.navigate(['/products']);
    }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
