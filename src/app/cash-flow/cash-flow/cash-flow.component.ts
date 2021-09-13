import { DateHelper } from './../../shared/utils/date.util';
import { Observable, of } from 'rxjs';
import { CashFlowStore } from './../service/cash-flow.store';
import { CashFlowDialogComponent } from './../cash-flow-dialog/cash-flow-dialog.component';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CashFlowGridModel } from '../model/cash-flow-grid.model';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit, OnDestroy {
  //@ViewChild('selectedRows') selectedRows: any;

  columnDefs = [
    { headerName: '#', field: 'slNo', width: 60, filter: 'agSetColumnFilter' },
    { headerName: 'Type', field: 'categoryType', filter: 'agTextColumnFilter' },
    { headerName: 'SubType', field: 'subCategoryType', filter: 'agTextColumnFilter' },
    { headerName: 'Amount', field: 'amount', width: 150 },
    { headerName: 'For/By', field: 'operatedAgainst', filter: 'agTextColumnFilter' },
    { headerName: 'Date', field: 'operatedOnInstance', width: 150, filter: 'agTextColumnFilter' }
  ];
  defaultColDef = {
    width: 100
  };
  rowSelection = 'single';
  gridApi: any;
  rowData$!: Observable<any>;

  cashFlowObservable: any;

  constructor(public dialog: MatDialog,
    private cfStore: CashFlowStore) {
  }

  ngOnInit(): void {
    this.getAllCashFlowDetails();
    console.log("Cash flow observabl data");
  }
  openDialog() {
    this.dialog.open(CashFlowDialogComponent, { width: '100%' });
  }


  getAllCashFlowDetails() {

    this.cashFlowObservable = this.cfStore.cashFlow$.subscribe(data => {
      let index = 0;
      const cashFlowData: CashFlowGridModel[] | undefined = [];
      data?.forEach(element => {
        const date = new DateHelper().convertUTCToLocalDateAndFormat(element?.operatedOnInstance, 'DD-MMM-YYYY');
        cashFlowData.push({
          slNo: ++index,
          categoryType: element?.categoryName,
          subCategoryType: element?.subCategoryName,
          amount: element?.amount,
          operatedAgainst: element?.operatedAgainst,
          operatedOnInstance: date,
          description: element.description
        });


      });
      this.rowData$ = of(cashFlowData);
    });
  }
  ngOnDestroy() {
    this.cashFlowObservable.unsubscribe();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;

  }
  onSelectionChanged(event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.dialog.open(CashflowDialogOverview, {
      data: selectedRows[0]
    });

  }
}

@Component({
  selector: 'cashflow-dialog-overview',
  templateUrl: 'cashflow-dialog-overview.html',
  styles: [
    `p {margin: 0 0 4px;}
    span{font-weight: 500; color: #314ac5;margin-right: 5px;}
    `
  ]
})
export class CashflowDialogOverview {

  constructor(
    public dialogRef: MatDialogRef<CashflowDialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: CashFlowGridModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}