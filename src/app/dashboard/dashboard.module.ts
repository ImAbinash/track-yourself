import { DashboardService } from './service/dashboard.service';
import { NgMaterialModule } from './../ng-material/ng-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgMaterialModule,
    DashboardRoutingModule
  ],
  providers:[
    DashboardService
  ]
})
export class DashboardModule { }
