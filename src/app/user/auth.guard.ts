import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate, CanLoad{

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

  //canLoad doesnot have access to router.snapshot hence we need to use Route path to get the hold of
  //requested path.
  canLoad(route: Route): boolean{
    return this.checkLoggedIn(route.path);
  }
  
}
