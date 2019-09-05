import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';
import { animation } from '@angular/animations';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //registering the animation 
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,private route: Router) { }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    //its good to use navigateByUrl then navigate method, coz we are logging out so we should
    //redirect user to home url not to any intermident url
    this.route.navigateByUrl('/welcome');

  }
}
