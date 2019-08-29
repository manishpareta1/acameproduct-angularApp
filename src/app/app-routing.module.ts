import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    imports: [
        //order of path maters here, if incorrectly metioned the it can match to wildcard
        //and result in incorrect path
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent},
            { path: '', redirectTo:'welcome', pathMatch: 'full'},
            { path: '**', component: PageNotFoundComponent}
      
          ])
    ],
    //this is to make the routs available in other module which are using it.
    //and also to make sure that routs defined in RouteModule defined in imports are accessible
    //when it is accessed in other module
    exports: [RouterModule]
})
export class AppRoutingModule{

}