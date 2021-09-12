import { DateHelper } from './../../shared/utils/date.util';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CashFlowStore } from './../service/cash-flow.store';
import { CashFlowDialogComponent } from './../cash-flow-dialog/cash-flow-dialog.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit, OnDestroy {
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
      const cashFlowData: { slNo: number; categoryType: string; subCategoryType: string; amount: number; operatedAgainst: string; operatedOnInstance: string; }[] | undefined = [];
      data?.forEach(element => {
        const date = new DateHelper().convertUTCToLocalDateAndFormat(element?.operatedOnInstance, 'DD-MMM-YYYY');
        cashFlowData.push({
          slNo: ++index,
          categoryType: element?.categoryName,
          subCategoryType: element?.subCategoryName,
          amount: element?.amount,
          operatedAgainst: element?.operatedAgainst,
          operatedOnInstance: date
        });


      });
      this.rowData$ = of(cashFlowData);
    });
  }
  ngOnDestroy() {
    this.cashFlowObservable.unsubscribe();
  }

}
