import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './product-resolver.service';
import { ProductListResolver } from './productlist-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
//import { AuthGuard } from '../user/auth.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      //{   //Commenting(#LL) root path/canActive/resole for products module here as part of Lazy Loading. it si already configured in app-routing.module.ts
          //#LL path: 'products', 
          //added guard to validate the if user is logged in before accessing the products page
          //we have added it at parent level hence it is applicable for all of its children route
          //#LL canActivate: [AuthGuard],
         // component: ProductListComponent, // commented to make Proudct list page as component less route
          //#LL resolve: {resolvedData: ProductListResolver},
          //Grouping the Component - making Proucts as component less route
          //#LL children: [
            //below route is needed to redirect products link to ProductListComponent
            //when we will click on ProudtList, it will try to look for a component to load, as there is no
            //component mapped in ProductList link, it will try to load child route defination
            //hence it will redirect it to below empty path route and load the associated component.
            { 
              path: '',              
              component: ProductListComponent
            },
            { 
              path: ':id', 
              component: ProductDetailComponent,
              //added Routing resolver active route resolver and bind the returned data to resolvedData
              resolve: { resolvedData: ProductResolver}
          },
          { 
              path: ':id/edit', 
              //associated candeactivate guard with product edit page, and it will be applicable for
              //both of its child route, info and tags.
              canDeactivate: [ProductEditGuard],
              component: ProductEditComponent,
              //added Routing resolver active route resolver and bind the returned data to resolvedData
              resolve: { resolvedData: ProductResolver },
              children: [
                { path: '' , redirectTo: 'info', pathMatch: 'full' },
                { path: 'info', component: ProductEditInfoComponent },
                { path: 'tags', component: ProductEditTagsComponent }
              ]
            }
          //]
     // }      
      
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule { }
