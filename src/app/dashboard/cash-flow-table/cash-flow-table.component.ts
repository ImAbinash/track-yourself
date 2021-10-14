import { DateHelper } from './../../shared/utils/date.util';
import { DashboardService } from './../service/dashboard.service';
import { Observable, of } from 'rxjs';
import { ICategoryWithCashFlowModel } from './../model/dashboar-view.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cash-flow-table',
  templateUrl: './cash-flow-table.component.html',
  styleUrls: ['./cash-flow-table.component.scss']
})
export class CashFlowTableComponent implements OnInit, OnDestroy {

  selectedCategoryObservable$!: Observable<any>;
  selectedObservableSubscriber: any;

  displayedColumns: string[] = ['type', 'for', 'amount', 'date', 'comment'];
  dataSource: Transaction[] = [];


  columnDefs = [
    {
      field: 'type',
      sortable: true,
      filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },
    { field: 'for', sortable: true, filter: true },
    { field: 'amountToShow', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'comment', sortable: true, filter: true }
  ];
  rowSelection = 'multiple';

  rowData$!: Observable<any>;



  constructor(private dashboardService: DashboardService) {
    this.selectedCategoryObservable$ = this.dashboardService.selectedCategoryObservable$;
  }

  ngOnInit(): void {

    this.initDataSource();

  }
  initDataSource() {
    this.selectedObservableSubscriber = this.selectedCategoryObservable$.subscribe((data) => {
      if (data != null && data.cashFlow != undefined && data.cashFlow.length > 0) {
        this.dataSource = data.cashFlow.slice();
        this.dataSource.map((item) => {
          item.amountToShow =  "₹"+item.amount.toFixed(2);
          item.date = new DateHelper().convertUTCToLocalDateAndFormat(item.date, 'DD-MMM-YYYY');
        })
        this.rowData$ = of(this.dataSource);
      } else {
        this.dataSource = [];
        this.rowData$ = of(this.dataSource);
      }
    });
  }
  ngOnDestroy() {
    this.selectedObservableSubscriber.unsubscribe();
  }


  /** Gets the total cost of all transactions. */
  // getTotalCost() {
  //   return this.transactions.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  // }

}


interface Transaction {
  amountToShow:string;
  amount: number;
  comment: string;
  date: string;
  for: string;
  type: string;
}
