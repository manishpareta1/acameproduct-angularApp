import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
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
  //property to check if the page is loading, to set the page spinner, like loading.....
  //this property will be used in html to run the spinner when the page is loading.
  loading = true; 
  
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  //As we want to watch event as soon as it start,
  //so we are subscribe to the event when the component is loaded and use it to display spinner
  constructor(private authService: AuthService,private route: Router) { 
    route.events.subscribe((routerEvent: Event) =>{
      this.checkRouterEvent(routerEvent);
    })
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    //its good to use navigateByUrl then navigate method, coz we are logging out so we should
    //redirect user to home url not to any intermident url
    this.route.navigateByUrl('/welcome');

  }

  //method to check if the event is still loading the data i.e  still trying to reach to a route,
  //hence setting the value to true, till it is true our spinner will appear on the page
  //if the route is reached we are setting the value of loading to false so the spinner is disavled
  checkRouterEvent(routerEvent: Event): void{
    if(routerEvent instanceof NavigationStart){
      this.loading = true;
    }
    if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError){
            this.loading = false;
          }
  }
}
