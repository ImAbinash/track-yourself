import { AgGridModule } from 'ag-grid-angular';
import { DashboardService } from './service/dashboard.service';
import { NgMaterialModule } from './../ng-material/ng-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CashFlowTableComponent } from './cash-flow-table/cash-flow-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CashFlowTableComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgMaterialModule,
    DashboardRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers:[
    DashboardService
  ]
})
export class DashboardModule { }
