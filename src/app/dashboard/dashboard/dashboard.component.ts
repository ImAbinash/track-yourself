import { DateHelper } from './../../shared/utils/date.util';
import { ICategoryWithCashFlowModel } from './../model/dashboar-view.model';
import { map, tap, filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthStoreService } from './../../auth/service/auth.store';
import { Observable } from 'rxjs';
import { DashboardService } from './../service/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  amountWRTCategory$!: Observable<Partial<ICategoryWithCashFlowModel>[] | []>;
  loggedOnUser!: string;
  selectedCardIndex: number = -1;

  filterParams: FormGroup;
  filterdCashFlows$: any;
  selectedReportCardIndex:number = -1;


  selectedCashFlowList!:ICategoryWithCashFlowModel;



  constructor(private authStore: AuthStoreService, private dashboardService: DashboardService, private fb: FormBuilder) {
    this.filterParams = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
    this.authStore.user$.subscribe((user) => {
      this.loggedOnUser = user?.firstName as string;
    })
  }

  ngOnInit(): void {
    this.amountWRTCategory$ = this.dashboardService.categoryWithCashFlowObservable$;
    this.filterdCashFlows$ = this.dashboardService.filterCategoryWithCashFlowObs$
  }
  toggleSelection(index: number, item: any) {
    this.selectedCardIndex = this.selectedCardIndex == index ? -1 : index;
    if (this.selectedCardIndex > -1) {
      this.dashboardService.selectedCategory(item);
    }
  }

  applyFilters() {
    console.clear();
    console.log("Filter param object: ", this.filterParams.value);
    this.dashboardService.filteredCashFlow(this.filterParams.value);

  }
  collapseEvent(){
    this.filterParams.reset();
    this.dashboardService.filteredCashFlow(this.filterParams.value);
  }
  selectedReport(index:number,item:ICategoryWithCashFlowModel){
    this.selectedReportCardIndex = this.selectedReportCardIndex == index ? -1 : index;

    
    console.log(this.selectedCashFlowList);

    if(index ==-1){
      this.selectedCashFlowList={} as ICategoryWithCashFlowModel;
    }else{
      this.selectedCashFlowList= {...item};
      this.selectedCashFlowList.cashFlow.forEach(element => {
        element.date = new DateHelper().convertUTCToLocalDateAndFormat(element.date,"DD-MMM-YYYY (dddd)");
      });
    }


  }
}
