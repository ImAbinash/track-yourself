import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { NgMaterialModule } from '../ng-material/ng-material.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgMaterialModule
  ],
  exports:[
    HeaderComponent,
    SideNavComponent
  ]
})
export class CoreModule { }
