import { AuthStoreService } from './../../auth/service/auth.store';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardService } from './../service/dashboard.service';
import { CategorySubcategoryStore } from './../../category/service/category-subcategory.store';
import { Component, OnInit } from '@angular/core';
import { ICategoryWithCashFlowModel } from '../model/dashboar-view.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  
  amountWRTCategory$!:Observable<Partial<ICategoryWithCashFlowModel>[] | []>;
  loggedOnUser!:string;
  constructor(private authStore:AuthStoreService, private dashboardService: DashboardService) {
    this.authStore.user$.subscribe((user)=>{
      this.loggedOnUser = user?.firstName as string;
    })
  }

  ngOnInit(): void {
    this.amountWRTCategory$ = this.dashboardService.categoryWithCashFlowObservable$;
  }

}
