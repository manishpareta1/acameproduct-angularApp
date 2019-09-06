import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';


@Injectable({
  providedIn: 'root'
})
//CanDeactivate takes a generic class to identifiy to which component it has to watch the deactivate state
//hence we should use the component which we want to watch using deactivate guard.
export class ProductEditGuard implements  CanDeactivate<ProductEditComponent>{ 
  
  canDeactivate(component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
    if(component.isDirty){
      const productName = component.product.productName || 'New Product';
      return confirm('Navigate away and lose all changes to '+productName);
    }   
      return true;
    }
}
