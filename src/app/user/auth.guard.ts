import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(private authService: AuthService,
    private route: Router){}

  canActivate(next: ActivatedRouteSnapshot, //activateroutesnapshot tells us what will be the next route to be activated
    //RouterStateSnapshot provide access to the entier router states
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |boolean | UrlTree{
      //state.url gives us the absolute path of the current navigation page
      return this.checkLoggedIn(state.url);

  }
  //added url to redirect user to same url where it was before getting the login authentication
  checkLoggedIn(url: string): boolean{
    if(this.authService.isLoggedIn){
      return true;
    }
    this.authService.redirectUrl = url;
    this.route.navigate(['/login']);
    return false;
  }
  
}
