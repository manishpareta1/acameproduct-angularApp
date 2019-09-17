import { NgModule } from '@angular/core';
import { Router, RouterModule, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { ProductListResolver } from './products/productlist-resolver.service'
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
    imports: [
        //order of path maters here, if incorrectly metioned the it can match to wildcard
        //and result in incorrect path
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent},
            //adding Product Module to Lazy load in root routing, along with AuthGaurd and route resolver
            { 
              path: 'products',
              /**
               * use canActivated guard if using preload all strategy
               * use canLoad guard if using lazy loading
               */
              canActivate: [AuthGuard],
              //canLoad: [AuthGuard],
              //added data property with preload = true for activating prelaoding selectiveStrategy.
              data: { preload: true},
              resolve: {resolvedData: ProductListResolver},
              loadChildren: () => 
              import('./products/product.module')
              .then(m=>m.ProductModule)
            }, 
            { path: '', redirectTo:'welcome', pathMatch: 'full'},
            { path: '**', component: PageNotFoundComponent}      
        ], 
        /** Use { preloadingStrategy: PreloadAllModules} for preloading all modules
         *  Use { preloadingStrategy: SelectiveStrategy} for custom preloading
         *///added preloading all strategy
          //{ preloadingStrategy: PreloadAllModules}
          { preloadingStrategy: SelectiveStrategy}
          
          //We can enable the route tracing with below code
            //{ enableTracing: true }
          )
    ],
    //this is to make the routs available in other module which are using it.
    //and also to make sure that routs defined in RouteModule defined in imports are accessible
    //when it is accessed in other module
    exports: [RouterModule]
})
export class AppRoutingModule{

}