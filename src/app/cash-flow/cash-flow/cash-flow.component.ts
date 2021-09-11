import { CashFlowDialogComponent } from './../cash-flow-dialog/cash-flow-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {
  columnDefs = [
    { headerName: '#', field: 'slNo', width: 60, filter: false },
    { headerName: 'Type', field: 'categoryType' },
    { headerName: 'SubType', field: 'subCategoryType' },
    { headerName: 'Amount', field: 'amount', width: 150 },
    { headerName: 'For/By', field: 'operatedAgainst' },
    { headerName: 'Date', field: 'operatedOnInstance', width: 150 }
  ];
  defaultColDef = {
    width: 100,
    filter: 'agTextColumnFilter',
  };
  rowData = [
    { slNo: 1, categoryType: 'Income', subCategoryType: "Salary", amount: 100000, operatedAgainst: "TCS", operatedOnInstance: "10-Sep-2021" },
    { slNo: 2, categoryType: 'Income', subCategoryType: "Salary", amount: 100000, operatedAgainst: "TCS", operatedOnInstance: "10-Sep-2021" },
    { slNo: 3, categoryType: 'Income', subCategoryType: "Salary", amount: 100000, operatedAgainst: "TCS", operatedOnInstance: "10-Sep-2021" }
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(CashFlowDialogComponent,{width:'100%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
