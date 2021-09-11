import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';

import { NgMaterialModule } from '../ng-material/ng-material.module';

import { CashFlowRoutingModule } from './cash-flow-routing.module';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { CashFlowDialogComponent } from './cash-flow-dialog/cash-flow-dialog.component';


@NgModule({
  declarations: [
    CashFlowComponent,
    CashFlowDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule,
    FlexLayoutModule,
    CashFlowRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CashFlowModule { }
