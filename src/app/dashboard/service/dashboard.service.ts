import { BehaviorSubject, Observable } from 'rxjs';
import { CashFlowStore } from './../../cash-flow/service/cash-flow.store';
import { CategorySubcategoryStore } from './../../category/service/category-subcategory.store';
import { Injectable } from '@angular/core';
import { ICashFlowModel, ICategoryWithCashFlowModel } from '../model/dashboar-view.model';

@Injectable()
export class DashboardService {

  private categoryWithCashFlowSubject = new BehaviorSubject<Array<Partial<ICategoryWithCashFlowModel>> | []>([]);
  categoryWithCashFlowObservable$: Observable<Array<Partial<ICategoryWithCashFlowModel>> | []>;

  constructor(private csStore: CategorySubcategoryStore, private cfStore: CashFlowStore) {
    this.categoryWithCashFlowObservable$ = this.categoryWithCashFlowSubject.asObservable();
    this.getAllCategory();

  }

  getAllCategory() {
    this.csStore.categoryObs$.subscribe((data) => {
      if (data?.length) {
        let catWithAmountObj: Array<Partial<ICategoryWithCashFlowModel>> = [];

          data.forEach(element => {
            catWithAmountObj.push({
              categoryId: element.id,
              categoryName: element.categoryName,
              cashFlow: [],
              totalAmount:0
            });
          });
          this.getAllCashFlow();
        this.categoryWithCashFlowSubject.next(catWithAmountObj);
      }
    });
  }
  getAllCashFlow() {
    this.cfStore.cashFlow$.subscribe((cashFlowData) => {
      if(cashFlowData?.length){
        // let casFlow:Array<Partial<ICashFlowModel>>=[];
        const categoryObj = this.categoryWithCashFlowSubject.getValue();
        if(categoryObj.length){
          cashFlowData.forEach(cashFlowElement => {
            categoryObj.forEach(categoryElement => {
              if(categoryElement.categoryId == cashFlowElement.cateoryId){
                // casFlow.push({
                //   cashFlowId:cashFlowElement.id,
                //   amount: cashFlowElement.amount
                // });
                categoryElement.totalAmount = (categoryElement.totalAmount as number) + cashFlowElement.amount;
                categoryElement.cashFlow?.push({
                  cashFlowId:cashFlowElement.id,
                  amount: cashFlowElement.amount
                })
              }
            });
          });
        }
      }
    })
  }

}
