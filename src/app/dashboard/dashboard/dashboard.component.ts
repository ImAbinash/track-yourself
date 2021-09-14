import { AuthStoreService } from './../../auth/service/auth.store';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardService } from './../service/dashboard.service';
import { Component, OnInit} from '@angular/core';
import { ICategoryWithCashFlowModel } from '../model/dashboar-view.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  amountWRTCategory$!:Observable<Partial<ICategoryWithCashFlowModel>[] | []>;
  loggedOnUser!:string;

  

  selectedCardIndex:number = -1;
  

  constructor(private authStore:AuthStoreService, private dashboardService: DashboardService) {
    this.authStore.user$.subscribe((user)=>{
      this.loggedOnUser = user?.firstName as string;
    })
  }

  ngOnInit(): void {
    this.amountWRTCategory$ = this.dashboardService.categoryWithCashFlowObservable$;
  }
  toggleSelection(index:number,item:any){
    this.selectedCardIndex = this.selectedCardIndex == index?-1:index;
    if(this.selectedCardIndex > -1){
      this.dashboardService.selectedCategory(item);
    }
  }
}
