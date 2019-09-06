import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      //added route for secondar route message popup
      {
        path:'message',
        component: MessageComponent,
        outlet: 'popup'
    }])
  ],
  declarations: [
    MessageComponent
  ]
})
export class MessageModule { }
