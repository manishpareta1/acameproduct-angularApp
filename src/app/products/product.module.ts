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

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
          path: 'products', 
         // component: ProductListComponent, // commented to make Proudct list page as component less route
          resolve: {resolvedData: ProductListResolver},
          //Grouping the Component - making Proucts as component less route
          children: [
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
              component: ProductEditComponent,
              //added Routing resolver active route resolver and bind the returned data to resolvedData
              resolve: { resolvedData: ProductResolver },
              children: [
                { path: '' , redirectTo: 'info', pathMatch: 'full' },
                { path: 'info', component: ProductEditInfoComponent },
                { path: 'tags', component: ProductEditTagsComponent }
              ]
            }
          ]
      }      
      
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
